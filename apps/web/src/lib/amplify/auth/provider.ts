import {
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';

import type { Environment } from '~/entities';

async function signInWithProviderCode(code: string, environment: Environment) {
  const [url] = window.location.href.split('?');

  const codeParams = new URLSearchParams({
    client_id: environment.aws.auth.webClientId,
    redirect_uri: url,
    grant_type: 'authorization_code',
    code,
  });

  const codeResponse = await fetch(
    `https://${environment.aws.auth.oauth.domain}/oauth2/token?${codeParams}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  );

  if (!codeResponse.ok) {
    throw new Error('failed to get oauth tokens');
  }

  const codePayload = await codeResponse.json();

  const AccessToken = new CognitoAccessToken({
    AccessToken: codePayload.access_token,
  });

  const IdToken = new CognitoIdToken({
    IdToken: codePayload.id_token,
  });

  const RefreshToken = new CognitoRefreshToken({
    RefreshToken: codePayload.refresh_token,
  });

  const sessionData = {
    IdToken,
    AccessToken,
    RefreshToken,
  };

  const session = new CognitoUserSession(sessionData);

  const poolData = {
    UserPoolId: environment.aws.auth.userPoolId,
    ClientId: environment.aws.auth.webClientId,
  };

  const userPool = new CognitoUserPool(poolData);

  const userData = {
    Username: AccessToken.payload.username,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  cognitoUser.setSignInUserSession(session);
}

export { signInWithProviderCode };
