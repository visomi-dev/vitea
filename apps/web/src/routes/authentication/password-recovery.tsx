import type { LoaderFunction, MetaFunction } from '@remix-run/node';

import { useEffect, useState } from 'react';
import { json } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

import type { CustomError } from '~/entities';
import type { Credentials } from '~/entities/auth';

import i18next from '~/i18n/i18next.server';

import { CREDENTIALS_KEY } from '~/constants/auth';

import { auth } from '~/lib/amplify/auth';
import { useSessionStorage } from '~/hooks/useSessionStorage';
import { PasswordRecoveryForm } from '~/components/auth/password-recovery/Form';
import clsx from 'clsx';

type LoaderData = {
  title: string;
};

const i18nNamespaces = ['common', 'authentication', 'authentication.forgottenPassword'];

export const handle = {
  i18n: i18nNamespaces,
};

export const loader: LoaderFunction = async ({ request }) => {
  const t = await i18next.getFixedT(request, i18nNamespaces);

  return json<LoaderData>({
    title: t('title'),
  });
};

export const meta: MetaFunction = ({ data }: { data: LoaderData }) => ({
  title: data.title,
});

export default function PasswordRecovery() {
  const { t } = useTranslation(i18nNamespaces);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorCode, setErrorCode] = useState('');
  const [credentials] = useSessionStorage<Credentials>('credentials', {
    email: '',
    password: '',
  });

  const onInput = () => {
    if (errorCode) {
      setErrorCode('');
    }
  };

  const onResendCode = async () => {
    setLoading(true);

    try {
      await auth.forgottenPassword(credentials.email);
    } catch (error) {
      setErrorCode((error as CustomError).code);
    }

    setLoading(false);
  };

  const onSubmit = async ({ code, password }: { code: string; password: string }) => {
    setLoading(true);

    try {
      await auth.passwordRecovery(credentials.email, code, password);
      await auth.signInWithEmailAndPassword(credentials.email, password);

      navigate(t`common:routes.dashboard`);
    } catch (error) {
      setErrorCode((error as CustomError).code);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!credentials || !credentials.email) {
      navigate(t`common:routes.auth.forgottenPassword`);
    }

    return () => {
      sessionStorage.removeItem(CREDENTIALS_KEY);
    };
  }, []);

  return (
    <>
      <PasswordRecoveryForm
        loading={loading}
        onInput={onInput}
        onResendCode={onResendCode}
        onSubmit={onSubmit}
      />

      <p
        className={clsx(
          'text-red-400 transition-all overflow-hidden',
          errorCode ? 'mt-0 max-h-96' : 'max-h-0 -mt-1',
        )}
      >
        {t`authentication.passwordRecovery:errorMessage`}
      </p>
    </>
  );
}
