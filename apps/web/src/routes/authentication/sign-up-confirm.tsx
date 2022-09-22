import type { LoaderFunction, MetaFunction } from '@remix-run/node';

import { useEffect, useState } from 'react';
import { json } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import type { CustomError } from '~/entities';
import type { Credentials } from '~/entities/auth';

import { CODE_MISMATCH_KEY, CREDENTIALS_KEY, DEFAULT_ERROR_KEY } from '~/constants/auth';

import i18next from '~/i18n/i18next.server';
import { auth } from '~/lib/amplify/auth';
import { useSessionStorage } from '~/hooks/useSessionStorage';

import { linkClasses, Loader } from '~/components/ui';
import { PinField } from '~/components/ui/Fields';

type LoaderData = { title: string; };

const i18nNamespaces = ['common', 'authentication', 'authentication.signUpConfirm'];

export const handle = {
  i18n: i18nNamespaces,
};

export const loader: LoaderFunction = async ({ request }) => {
  const t = await i18next.getFixedT(request, i18nNamespaces);

  return json<LoaderData>({ title: t('authentication.signUpConfirm:title') });
};

export const meta: MetaFunction = ({ data }: { data: LoaderData }) => ({
  title: data.title,
});

export default function SignUpConfirm() {
  const navigate = useNavigate();
  const { t } = useTranslation(i18nNamespaces);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorCode, setErrorCode] = useState('');
  const [credentials] = useSessionStorage<Credentials>(CREDENTIALS_KEY);

  const onInput = () => {
    if (errorCode) {
      setErrorCode('');
    }
  };

  const onClickResend = async () => {
    if (count === 0 && !loading) {
      setLoading(true);

      setCount(60);

      try {
        await auth.resendVerificationCode(credentials.email);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);

        setErrorCode(DEFAULT_ERROR_KEY);
      }

      setLoading(false);
    }
  };

  const onComplete = async (code: string) => {
    setLoading(true);

    try {
      await auth.signUpConfirm(credentials.email, code);
      await auth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password,
      );

      navigate(t`common:routes.onboarding`);
    } catch (error) {
      switch ((error as CustomError).code) {
        case 'ExpiredCodeException':
        case 'CodeMismatchException':
          setErrorCode(CODE_MISMATCH_KEY);

          break;
        default:
          setErrorCode(DEFAULT_ERROR_KEY);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    if (count > 0) {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    }
  }, [count]);

  useEffect(() => {
    if (!credentials || !credentials.email || !credentials.password) {
      navigate(t`common:routes.auth.signIn`);
    }

    return () => {
      sessionStorage.removeItem(CREDENTIALS_KEY);
    };
  }, []);

  return (
    <>
      <PinField
        id="verification-code"
        label={t`authentication.signUpConfirm:form.pin.label`}
        disabled={loading}
        digits={6}
        onInput={onInput}
        onComplete={onComplete}
      />

      <p
        className={clsx(
          'text-red-400 transition-all overflow-hidden',
          errorCode ? 'mt-0 max-h-96' : 'max-h-0 -mt-1',
        )}
      >
        {t([`${errorCode}`])}
      </p>

      <div className="flex">
        <span
          aria-hidden="true"
          className={clsx(
            'text-gray-700',
            loading && 'opacity-75',
            count === 0 && linkClasses,
          )}
          onClick={onClickResend}
        >
          {count > 0 ? count : t`authentication.signUpConfirm:resendCode`}
        </span>
      </div>

      <Loader
        className={clsx(
          'mx-auto w-24 transition-all',
          !loading ? 'opacity-0 overflow-hidden max-h-0 mt-4' : '-mt-4',
        )}
      />
    </>
  );
}
