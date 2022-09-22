import type { FormEvent, FormEventHandler } from 'react';

import { useState } from 'react';

import { Button } from '~/components/ui';
import { TextField } from '~/components/ui/Fields';
import { useTranslation } from 'react-i18next';

type Props = {
  loading: boolean;
  onInput?(event: FormEvent<HTMLInputElement>): void;
  onSubmit(data: { email: string }): void;
};

const i18nNamespaces = ['authentication', 'authentication.forgottenPassword'];

export function ForgottenPasswordForm({
  loading,
  onInput,
  onSubmit,
}: Props) {
  const { t } = useTranslation(i18nNamespaces);
  const [email, setEmail] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    onSubmit({ email });
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

      <Button
        type="submit"
        variant="solid"
        color="emerald"
        className="w-full mt-8"
        loading={loading}
      >
        {t`authentication.forgottenPassword:form.button.label`}
      </Button>
    </form>
  );
}
