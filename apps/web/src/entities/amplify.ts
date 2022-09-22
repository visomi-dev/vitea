import type { Environment } from '.';

export type CognitoUserInfo = {
  authorization: string;
  username: string;
  attributes: {
    name: string;
    email: string;
  };
  groups: string[];
};

export type AuthSDK = {
  configure(params: {
    userPoolId: string;
    userPoolWebClientId: string;
    region: string;
    storage: Storage | undefined;
  }): void;
  signUpWithEmailAndPassword(params: {
    name: string;
    email: string;
    password: string;
  }): Promise<void>;
  signUpConfirm(params: { email: string; code: string }): Promise<void>;
  resendVerificationCode(email: string): Promise<void>;
  signInWithEmailAndPassword(credentials: {
    email: string;
    password: string;
    rememberMe?: boolean;
  }): Promise<void>;
  forgottenPassword(email: string): Promise<void>;
  passwordRecovery(params: {
    email: string;
    code: string;
    password: string;
  }): Promise<void>;
  getUser(): Promise<CognitoUserInfo>;
  signOut(params: { global: boolean }): Promise<void>;
};

export type AuthProviderSDK = {
  signInWithProviderCode(code: string, environment: Environment): Promise<void>;
};
