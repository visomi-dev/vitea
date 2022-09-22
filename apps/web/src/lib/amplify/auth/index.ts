import { BehaviorSubject, takeUntil } from 'rxjs';

import type { AuthProviderSDK, AuthSDK } from '~/entities/amplify';
import type { Environment } from '~/entities';

class Auth {
  private $sdk: AuthSDK | null = null;

  private $provider: AuthProviderSDK | null = null;

  private initializing = new BehaviorSubject<boolean>(false);

  private initialized = new BehaviorSubject<boolean>(false);

  private initializingProvider = new BehaviorSubject<boolean>(false);

  private initializedProvider = new BehaviorSubject<boolean>(false);

  private error?: Error;

  constructor() {
    this.initializing.next(true);

    import('./sdk')
      .then(({ sdk }) => {
        this.$sdk = sdk;
        this.initialized.next(true);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(
          'an error ocurred when trying to initialize amplify auth',
        );

        this.error = error;

        throw error;
      })
      .finally(() => {
        this.initializing.next(false);
      });

    import('./provider')
      .then((module) => {
        this.$provider = module;
        this.initializedProvider.next(true);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(
          'an error ocurred when trying to initialize amplify auth',
        );

        this.error = error;

        throw error;
      })
      .finally(() => {
        this.initializingProvider.next(false);
      });
  }

  get sdk(): Promise<AuthSDK> {
    return new Promise((resolve, reject) => {
      if (this.$sdk) {
        resolve(this.$sdk);
      } else {
        this.initializing
          .pipe(takeUntil(this.initialized))
          .subscribe((initializing) => {
            if (this.$sdk) {
              resolve(this.$sdk);
            }

            if (!this.$sdk && !initializing && this.error) {
              reject(this.error);
            }
          });
      }
    });
  }

  get provider(): Promise<AuthProviderSDK> {
    return new Promise((resolve, reject) => {
      if (this.$provider) {
        resolve(this.$provider);
      } else {
        this.initializingProvider
          .pipe(takeUntil(this.initializedProvider))
          .subscribe((initializing) => {
            if (this.$provider) {
              resolve(this.$provider);
            }

            if (!this.$provider && !initializing && this.error) {
              reject(this.error);
            }
          });
      }
    });
  }

  async signUp(name: string, email: string, password: string) {
    return this.sdk.then((sdk) => sdk.signUpWithEmailAndPassword({ name, email, password }));
  }

  async resendVerificationCode(email: string) {
    return this.sdk.then((sdk) => sdk.resendVerificationCode(email));
  }

  async signUpConfirm(email: string, code: string) {
    return this.sdk.then((sdk) => sdk.signUpConfirm({ email, code }));
  }

  async signInWithEmailAndPassword(
    email: string,
    password: string,
    rememberMe?: boolean,
  ) {
    return this.sdk.then((sdk) => sdk.signInWithEmailAndPassword({ email, password, rememberMe }));
  }

  async signInWithProvider(code: string, environment: Environment) {
    return this.provider.then((provider) => provider.signInWithProviderCode(code, environment));
  }

  async forgottenPassword(email: string) {
    return this.sdk.then((sdk) => sdk.forgottenPassword(email));
  }

  async passwordRecovery(email: string, code: string, password: string) {
    return this.sdk.then((sdk) => sdk.passwordRecovery({ email, code, password }));
  }

  async signOut(global?: boolean) {
    return this.sdk.then((sdk) => sdk.signOut({ global: !!global }));
  }
}

export const auth = new Auth();
