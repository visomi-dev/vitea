import type { LoaderFunction, MetaFunction } from '@remix-run/node';

import { useState } from 'react';
import { json } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import type { CustomError } from '~/entities';
import type { Credentials } from '~/entities/auth';

import i18next from '~/i18n/i18next.server';
import { auth } from '~/lib/amplify/auth';
import { useSessionStorage } from '~/hooks/useSessionStorage';

import { SignUpForm } from '~/components/auth/sign-up/Form';
import { Link } from '~/components/ui';

type LoaderData = { title: string; };

const i18nNamespaces = ['common', 'authentication', 'authentication.signUp'];

export const handle = {
  i18n: i18nNamespaces,
};

export const loader: LoaderFunction = async ({ request }) => {
  const t = await i18next.getFixedT(request, i18nNamespaces);

  return json<LoaderData>({ title: t('authentication.signUp:title') });
};

export const meta: MetaFunction = ({ data }: { data: LoaderData }) => ({
  title: data.title,
});

export default function SignUp() {
  const navigate = useNavigate();
  const { t } = useTranslation(i18nNamespaces);

  const [loading, setLoading] = useState(false);
  const [errorCode, setErrorCode] = useState('');
  const [, setCredentials] = useSessionStorage<Credentials>('credentials', {
    email: '',
    password: '',
  });

  const onInput = () => {
    if (errorCode) {
      setErrorCode('');
    }
  };

  const onSubmit = async ({ name, email, password }: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);

    try {
      await auth.signUp(name, email, password);

      setCredentials({ email, password });

      navigate(t`common:routes.auth.signUpConfirm`);
    } catch (error) {
      setErrorCode((error as CustomError).code);
    }

    setLoading(false);
  };

  return (
    <>
      <SignUpForm
        loading={loading}
        onInput={onInput}
        onSubmit={onSubmit}
      />

      <p
        className={clsx(
          'text-red-400 transition-all overflow-hidden',
          errorCode ? 'mt-0 max-h-96' : 'max-h-0 -mt-1',
        )}
      >
        {t`authentication.signUp:errorMessage`}
      </p>

      <hr className="w-full border border-slate-300/40" />

      <Link
        to={t`common:routes.auth.signIn`}
        className="text-center"
      >
        {t`authentication.signUp:links.signIn`}
      </Link>
    </>
  );
}
