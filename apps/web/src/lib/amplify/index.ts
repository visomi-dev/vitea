import { Amplify } from 'aws-amplify';

import { environment } from '~/constants/environment';

let configured = false;

export function config() {
  if (!configured) {
    Amplify.configure({
      Auth: {
        region: environment.aws.region,
        userPoolId: environment.aws.auth.userPoolId,
        userPoolWebClientId: environment.aws.auth.webClientId,
        cookieStorage: {
          domain: environment.aws.auth.cookieStorage.domain,
          secure: environment.aws.auth.cookieStorage.secure,
          path: environment.aws.auth.cookieStorage.path,
          expires: environment.aws.auth.cookieStorage.expires,
        },
      },
      ssr: true,
    });

    configured = true;
  }
}
