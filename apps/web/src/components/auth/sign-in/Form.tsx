import type { FormEvent, FormEventHandler } from 'react';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '~/components/ui';
import { PasswordField, TextField } from '~/components/ui/Fields';

type Props = {
  loading: boolean;
  onInput?(event: FormEvent<HTMLInputElement>): void;
  onSubmit(data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }): void;
};

const i18nNamespaces = ['authentication', 'authentication.signIn'];

export function SignInForm({
  loading, onInput, onSubmit,
}: Props) {
  const { t } = useTranslation(i18nNamespaces);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    onSubmit({ email, password, rememberMe });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <TextField
        id="email"
        name="email"
        type="email"
        label={t`authentication:form.email.label`}
        placeholder={t`authentication:form.email.placeholder`}
        errorMessage={t`authentication:form.email.errorMessage`}
        autoComplete="email"
        onInput={(event) => {
          setEmail((event.target as HTMLInputElement).value);

          if (onInput) {
            onInput(event);
          }
        }}
        autoFocus
        required
      />

      <PasswordField
        id="password"
        name="password"
        label={t`authentication:form.password.label`}
        placeholder={t`authentication:form.password.placeholder`}
        errorMessage={t`authentication:form.password.errorMessage`}
        onInput={(event) => {
          setPassword((event.target as HTMLInputElement).value);

          if (onInput) {
            onInput(event);
          }
        }}
        autoComplete="current-password"
        required
      />

      <label htmlFor="remember-me" className="flex items-center gap-1">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 border-gray-300 text-emerald-700 focus:ring-emerald-500 rounded bg-transparent disabled:opacity-50"
          disabled={loading}
          onInput={(event) => {
            setRememberMe(!rememberMe);

            if (onInput) {
              onInput(event);
            }
          }}
        />

        {t`authentication.signIn:form.keepMeLoggedIn.label`}
      </label>

      <Button
        type="submit"
        variant="solid"
        color="emerald"
        className="w-full mt-8"
        loading={loading}
      >
        {t`authentication.signIn:form.button.label`}
      </Button>
    </form>
  );
}
