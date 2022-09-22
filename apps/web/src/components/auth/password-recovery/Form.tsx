import type { FormEvent, FormEventHandler } from 'react';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { linkClasses, Button } from '~/components/ui';
import { PasswordField, PinField } from '~/components/ui/Fields';

import { useTranslation } from 'react-i18next';
import { PasswordRequirements } from '../PasswordRequirements';

type Props = {
  loading: boolean;
  onResendCode?(): void;
  onInput?(event: FormEvent<HTMLInputElement> | string): void;
  onSubmit(data: { code: string; password: string }): void;
};

const i18nNamespaces = ['authentication', 'authentication.forgottenPassword'];

export function PasswordRecoveryForm({
  loading,
  onResendCode,
  onInput,
  onSubmit,
}: Props) {
  const { t } = useTranslation(i18nNamespaces);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [count, setCount] = useState(0);

  const onClickResend = () => {
    if (count === 0 && !loading && onResendCode) {
      onResendCode();
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    onSubmit({ code, password });
  };

  useEffect(() => {
    if (count > 0) {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    }
  }, [count]);

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <PinField
        id="verification-code"
        label={t`authentication.passwordRecovery:form.pin.label`}
        disabled={loading}
        digits={6}
        onInput={(value: string) => {
          setCode(value);

          if (onInput) onInput(value);
        }}
      />

      <div className="flex">
        <button
          type="button"
          className={clsx(
            'text-gray-700 transition-all',
            loading && 'opacity-75',
            count === 0 && linkClasses,
            code.length < 6 ? 'max-h-screen' : 'max-h-0 overflow-hidden -mt-2',
          )}
          onClick={onClickResend}
        >
          {count > 0 ? count : t`authentication.passwordRecovery:resendCode`}
        </button>
      </div>

      <div
        className={clsx(
          'flex flex-col gap-2 transition-all',
          code.length < 6 && 'opacity-0 pointer-events-none',
        )}
      >
        <PasswordField
          id="password"
          name="password"
          label={t`authentication:form.password.label`}
          placeholder={t`authentication:form.password.placeholder`}
          autoComplete="current-password"
          onInput={(event) => {
            setPassword((event.target as HTMLInputElement).value);

            if (onInput) {
              onInput(event);
            }
          }}
          disabled={loading}
          required
        >
          <PasswordRequirements password={password} />
        </PasswordField>

        <PasswordField
          id="password-confirm"
          name="passwordConfirm"
          label={t`authentication:form.passwordConfirm.label`}
          errorMessage={t`authentication:form.passwordConfirm.errorMessage`}
          placeholder={t`authentication:form.passwordConfirm.placeholder`}
          pattern={password}
          autoComplete="current-password-confirm"
          disabled={loading}
          required
        />

        <Button
          type="submit"
          variant="solid"
          color="emerald"
          className="w-full mt-8"
          loading={loading}
        >
          {t`authentication.passwordRecovery:form.button.label`}
        </Button>
      </div>
    </form>
  );
}
