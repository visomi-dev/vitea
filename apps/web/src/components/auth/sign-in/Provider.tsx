import { Button } from '~/components/ui';

type Props = {
  signInUrl: string;
  clientId: string;
  redirectUrl: string;
  provider: 'Google';
  loading: boolean;
  className?: string;
  children: React.ReactNode;
};

export function SignInWithProvider({
  signInUrl,
  redirectUrl,
  clientId,
  provider,
  loading,
  children,
  className,
}: Props) {
  return (
    <form id="sign-in-provider" action={signInUrl} className={className}>
      <input type="hidden" name="response_type" value="code" />
      <input type="hidden" name="client_id" value={clientId} />
      <input type="hidden" name="redirect_uri" value={redirectUrl} />
      <input type="hidden" name="identity_provider" value={provider} />
      <input
        type="hidden"
        name="scope"
        value="email profile openid aws.cognito.signin.user.admin"
      />

      <Button
        variant="outline"
        loading={loading}
        form="sign-in-provider"
        type="submit"
        className="w-full"
      >
        {children}
      </Button>
    </form>
  );
}
