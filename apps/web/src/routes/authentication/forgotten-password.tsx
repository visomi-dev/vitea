import type { LoaderFunction, MetaFunction } from '@remix-run/node';

import { useState } from 'react';
import { json } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

import type { CustomError } from '~/entities';
import type { Credentials } from '~/entities/auth';

import i18next from '~/i18n/i18next.server';

import { CREDENTIALS_KEY } from '~/constants/auth';

import { auth } from '~/lib/amplify/auth';
import { useSessionStorage } from '~/hooks/useSessionStorage';

import { Link } from '~/components/ui';
import { ForgottenPasswordForm } from '~/components/auth/forgotten-password/Form';

type LoaderData = {
  title: string;
};

const i18nNamespaces = ['common', 'authentication.forgottenPassword'];

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

export default function ForgottenPassword() {
  const navigate = useNavigate();
  const { t } = useTranslation(i18nNamespaces);
  const [loading, setLoading] = useState(false);
  const [errorCode, setErrorCode] = useState('');
  const [, setCredentials] = useSessionStorage<Credentials>(CREDENTIALS_KEY, {
    email: '',
    password: '',
  });

  const onInput = () => {
    if (errorCode) {
      setErrorCode('');
    }
  };

  const onSubmit = async ({ email }: { email: string }) => {
    setLoading(true);

    try {
      await auth.forgottenPassword(email);

      setCredentials({ email, password: '' });

      navigate(t`common:routes.auth.passwordRecovery`);
    } catch (error) {
      setErrorCode((error as CustomError).code);
    }

    setLoading(false);
  };

  return (
    <>
      <ForgottenPasswordForm
        loading={loading}
        onInput={onInput}
        onSubmit={onSubmit}
      />

      <hr className="w-full border-slate-300/40 border mt-2" />

      <div className="flex flex-col justify-center items-center gap-4">
        <Link to={t`common:routes.auth.signIn`}>
          {t`authentication.forgottenPassword:links.signIn`}
        </Link>
      </div>
    </>
  );
}
