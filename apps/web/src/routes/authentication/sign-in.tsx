import type { LoaderFunction, MetaFunction } from '@remix-run/node';

import { useEffect, useState } from 'react';
import { json } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import type { CustomError } from '~/entities';
import type { Credentials } from '~/entities/auth';

import i18next from '~/i18n/i18next.server';

import { auth } from '~/lib/amplify/auth';
import { useSessionStorage } from '~/hooks/useSessionStorage';
import { environment } from '~/constants/environment';
import { CREDENTIALS_KEY } from '~/constants/auth';

import { SignInForm } from '~/components/auth/sign-in/Form';
import { SignInWithProvider } from '~/components/auth/sign-in/Provider';
import { GoogleIcon, Link } from '~/components/ui';

type LoaderData = {
  title: string;
  clientId: string;
  signInWithProviderUrl: string;
};

const i18nNamespaces = ['common', 'authentication', 'authentication.signIn'];

export const handle = {
  i18n: i18nNamespaces,
};

export const loader: LoaderFunction = async ({ request }) => {
  const t = await i18next.getFixedT(request, i18nNamespaces);

  return json<LoaderData>({
    title: t('title'),
    clientId: environment.aws.auth.webClientId,
    signInWithProviderUrl: `https://${environment.aws.auth.oauth.domain}/oauth2/authorize`,
  });
};

export const meta: MetaFunction = ({ data }: { data: LoaderData }) => ({
  title: data.title,
});

export default function SignIn() {
  const { t } = useTranslation(i18nNamespaces);
  const {
    clientId,
    signInWithProviderUrl,
  } = useLoaderData<LoaderData>();
  const navigate = useNavigate();
  const [redirectUrl, setRedirectUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorCode, setErrorCode] = useState('');
  const [, setCredentials] = useSessionStorage<Credentials>(CREDENTIALS_KEY, {
    email: '',
    password: '',
  });
  // const [, setRememberMe] = useSessionStorage<boolean>(REMEMBER_ME_KEY, false);

  const onInput = () => {
    if (errorCode) {
      setErrorCode('');
    }
  };

  const onSubmit = async ({ email, password }: { email: string; password: string; }) => {
    setLoading(true);

    try {
      // if (rememberMe) {
      //   setRememberMe(rememberMe);
      // }

      await auth.signInWithEmailAndPassword(email, password);

      navigate(t`common:routes.dashboard`);
    } catch (error) {
      switch ((error as CustomError).code) {
        case 'UserNotConfirmedException':
          setCredentials({ email, password });

          navigate(t`common:routes.auth.signUpConfirm`);

          break;
        default:
          setErrorCode((error as CustomError).code);

          break;
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    setRedirectUrl(window.location.href);
  }, []);

  return (
    <>
      <SignInForm
        loading={loading}
        onInput={onInput}
        onSubmit={onSubmit}
      />

      <p
        className={clsx(
          'text-red-400 transition-all overflow-hidden',
          errorCode ? 'mt-0 max-h-96' : 'max-h-0 -mt-4',
        )}
      >
        {t`authentication.signIn:errorMessage`}
      </p>

      <div className="w-full flex flex-col gap-4 mt-2">
        <div className="relative flex justify-center items-center">
          <hr className="absolute w-full border-slate-300/40 border" />

          <span className="px-2 bg-gray-50 md:bg-white-100 z-10">
            {t`authentication.signIn:withProvider.message`}
          </span>
        </div>

        <SignInWithProvider
          className="w-full"
          provider="Google"
          redirectUrl={redirectUrl}
          clientId={clientId}
          signInUrl={signInWithProviderUrl}
          loading={loading}
        >
          <GoogleIcon
            className={clsx(
              'w-4 h-auto transition-all',
              loading && 'opacity-0',
            )}
          />
          <span className="font-semibold"> oogle </span>
        </SignInWithProvider>
      </div>

      <hr className="w-full border-slate-300/40 border mt-2" />

      <div className="flex flex-col justify-center items-center gap-4">
        <Link to={t`common:routes.auth.signUp`}>
          {t`authentication.signIn:links.signUp`}
        </Link>

        <Link to={t`common:routes.auth.forgottenPassword`}>
          {t`authentication.signIn:links.forgottenPassword`}
        </Link>
      </div>
    </>
  );
}
