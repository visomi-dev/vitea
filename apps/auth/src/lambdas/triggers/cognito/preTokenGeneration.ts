import {
  Callback, Context, PreTokenGenerationTriggerEvent, PreTokenGenerationTriggerHandler,
} from 'aws-lambda';
import set from 'lodash/set';

import { logger } from '~/lib/logger';
import { findUsersByEmail } from '~/lib/cognito';

const FEDERATED_PROVIDERS = ['google', 'facebook', 'twitter', 'apple'];

async function preTokenGenerationTriggerHandler(
  event: PreTokenGenerationTriggerEvent,
  ctx: Context,
  callback: Callback,
) {
  const {
    request: {
      userAttributes: { email },
    },
  } = event;

  const [provider] = event.userName.split('_');

  if (FEDERATED_PROVIDERS.includes(provider)) {
    logger.debug('Generating Token for Federated Entity');

    logger.debug('Getting cognito user');

    const users = await findUsersByEmail(email, event.userPoolId);

    const user = users.find((userMatch) => {
      const [userMatchProvider] = userMatch.Username!.split('_');

      return !FEDERATED_PROVIDERS.includes(userMatchProvider);
    });

    if (user) {
      logger.debug('Cognito user found replacing username');

      set(event.response, 'claimsOverrideDetails.username', user.Username);
    } else {
      logger.debug('Cognito user not found');

      callback(new Error('Previous cognito user not found'), event);
    }
  }

  callback(null, event);
}

export const handler: PreTokenGenerationTriggerHandler = preTokenGenerationTriggerHandler;
