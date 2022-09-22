import type { Auth as AuthClass } from '@aws-amplify/auth';

import { withSSRContext } from 'aws-amplify';
import get from 'lodash/get';

import type { CognitoUserAttributes, User } from '~/entities/auth';

import logger from '../logger';

export async function getUserFromRequest(request: Request) {
  try {
    const Auth = withSSRContext({
      req: { headers: { cookie: request.headers.get('cookie') } },
    }).Auth as typeof AuthClass;

    const cognitoUser = await Auth.currentAuthenticatedUser();
    const attributes = get<CognitoUserAttributes>(
      cognitoUser,
      'attributes',
      {} as CognitoUserAttributes,
    );

    const user: User = {
      id: cognitoUser.username,
      name: attributes.name,
      email: attributes.email,
    };

    return user;
  } catch (error) {
    logger.error(error);

    return null;
  }
}
