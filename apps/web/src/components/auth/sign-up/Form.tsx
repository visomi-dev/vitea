import type { FormEvent, FormEventHandler } from 'react';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '~/components/ui';
import { PasswordField, TextField } from '~/components/ui/Fields';

import { PasswordRequirements } from '../PasswordRequirements';

type Props = {
  loading: boolean;
  onInput?(event: FormEvent<HTMLInputElement>): void;
  onSubmit(data: { name: string; email: string; password: string }): void;
};

const i18nNamespaces = ['authentication', 'authentication.signUp'];

export function SignUpForm({
  loading, onInput, onSubmit,
}: Props) {
  const { t } = useTranslation(i18nNamespaces);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    onSubmit({ name, email, password });
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <TextField
        id="name"
        name="name"
        label={t`authentication.signUp:form.name.label`}
        placeholder={t`authentication.signUp:form.name.placeholder`}
        autoComplete="name"
        onInput={(event) => {
          setName((event.target as HTMLInputElement).value);

          if (onInput) {
            onInput(event);
          }
        }}
        disabled={loading}
        autoFocus
        required
      />

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
        disabled={loading}
        required
      />

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
        {t`authentication.signUp:form.button.label`}
      </Button>
    </form>
  );
}
