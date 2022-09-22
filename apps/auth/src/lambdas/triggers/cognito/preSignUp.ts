// @ts-ignore
import MaskData from 'maskdata';
import {
  Callback, Context, PreSignUpTriggerEvent, PreSignUpTriggerHandler,
} from 'aws-lambda';

import { logger } from '~/lib/logger';
import { createUser, findUsersByEmail, linkFederatedUser } from '~/lib/cognito';

async function preSignUpTriggerHandler(
  event: PreSignUpTriggerEvent,
  ctx: Context,
  callback: Callback,
) {
  const {
    request: {
      userAttributes: { name, email },
    },
  } = event;

  const maskedEmail = MaskData.maskEmail2(email);

  switch (event.triggerSource) {
    case 'PreSignUp_ExternalProvider':
      try {
        logger.debug('PreSignUp_ExternalProvider');
        logger.debug(`Creating federated user with email: ${maskedEmail}`);

        let [user] = await findUsersByEmail(email, event.userPoolId);

        if (!user) {
          logger.debug('Previous cognito user not exits creating');

          user = await createUser({
            userPoolId: event.userPoolId,
            name,
            email,
            emailVerified: true,
          });

          logger.debug('User created');
        } else {
          logger.debug('Previous cognito user found');
        }

        logger.debug(
          `Linking Cognito User: ${user.Username} with: ${event.userName}`,
        );

        await linkFederatedUser(
          user.Username as string,
          event.userName,
          event.userPoolId,
        );

        logger.debug('Linked');

        callback(null, event);
      } catch (error) {
        logger.error(
          'An error ocurred when trying to link previous user with federated user',
        );

        logger.error(JSON.stringify(error));

        callback(error as Error, event);
      }

      break;
    default:
      callback(null, event);

      break;
  }
}

export const handler: PreSignUpTriggerHandler = preSignUpTriggerHandler;
