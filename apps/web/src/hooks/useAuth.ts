import { auth } from '~/lib/amplify/auth';

export default function useAuth() {
  return auth;
}
