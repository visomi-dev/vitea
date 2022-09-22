import {
  buildClient,
  CommitmentPolicy,
  KmsKeyringNode,
} from '@aws-crypto/client-node';
import {
  Callback, Context, CustomEmailSenderTriggerEvent, CustomEmailSenderTriggerHandler,
} from 'aws-lambda';
import get from 'lodash/get';

import { logger } from '~/lib/logger';
import { sendgrid } from '~/lib/sendgrid';

import { environment } from '~/environment';

// @ts-ignore
const { decrypt } = buildClient(CommitmentPolicy.REQUIRE_ENCRYPT_ALLOW_DECRYPT);
const keyring = new KmsKeyringNode({ keyIds: [environment.kmsKeyArn] });

async function customEmailSenderTriggerHandler(
  event: CustomEmailSenderTriggerEvent,
  ctx: Context,
  callback: Callback,
) {
  const {
    request: { code },
    triggerSource,
  } = event;

  const email = get(event, 'request.userAttributes.email');
  const name = get(event, 'request.userAttributes.name');

  const { plaintext: plainTextCode } = await decrypt(
    keyring,
    Buffer.from(code as string, 'base64'),
  );

  const emailData = {
    from: environment.emails.sendgridFrom,
    templateId: '',
    to: email,
    dynamicTemplateData: {
      name,
      code: `${plainTextCode.toString()}`,
    },
  };

  logger.debug(triggerSource);

  switch (triggerSource) {
    case 'CustomEmailSender_SignUp':
    case 'CustomEmailSender_ResendCode':
      emailData.templateId = environment.sendgrid.verificationCodeTemplateId;

      break;
    case 'CustomEmailSender_ForgotPassword':
      emailData.templateId = environment.sendgrid.passwordResetTemplateId;

      break;
    default:
      logger.debug(`No implemented triggerSource: ${triggerSource}`);

      break;
  }

  try {
    await sendgrid.send(emailData);
  } catch (error: unknown) {
    logger.error(
      'An error ocurred when trying to send custom email',
    );

    logger.error(JSON.stringify(error));
  }

  callback(null, event);
}

export const handler: CustomEmailSenderTriggerHandler = customEmailSenderTriggerHandler;
