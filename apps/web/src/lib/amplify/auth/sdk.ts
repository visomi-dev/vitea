import { Auth } from '@aws-amplify/auth';

import type { AuthSDK, CognitoUserInfo } from '~/entities/amplify';

export const sdk: AuthSDK = {
  configure(config) {
    Auth.configure(config);
  },

  async signUpWithEmailAndPassword({ name, email, password }) {
    await Auth.signUp({
      username: email,
      password,
      attributes: {
        name,
      },
    });
  },

  async signUpConfirm({ email, code }) {
    await Auth.confirmSignUp(email, code);
  },

  async resendVerificationCode(email) {
    await Auth.resendSignUp(email);
  },

  // TODO: implement rememberMe
  async signInWithEmailAndPassword({ email, password }) {
    const user = await Auth.signIn(email, password);

    return user;
  },

  async forgottenPassword(email) {
    await Auth.forgotPassword(email);
  },

  async passwordRecovery({ email, code, password }) {
    await Auth.forgotPasswordSubmit(email, code, password);
  },

  async getUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();

      await user.getCachedDeviceKeyAndPassword();

      const {
        username,
        attributes: { name, email },
      }: CognitoUserInfo = (await Auth.currentUserInfo()) ?? {
        attributes: { name: '', email: '' },
      };

      const groups: string[] = user?.signInUserSession?.idToken?.payload['cognito:groups'] ?? [];

      return {
        authorization: user?.signInUserSession?.idToken?.jwtToken,
        username,
        attributes: { name, email },
        groups,
      };
    } catch (error) {
      await Auth.signOut();

      throw error;
    }
  },

  async signOut({ global }: { global: boolean }) {
    await Auth.signOut({ global });
  },
};
