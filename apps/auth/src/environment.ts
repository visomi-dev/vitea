import { Environment } from './entities';

export const environment: Environment = {
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY as string,
    verificationCodeTemplateId: process.env
      .SENDGRID_VERIFICATION_CODE_TEMPLATE_ID as string,
    passwordResetTemplateId: process.env
      .SENDGRID_PASSWORD_RESET_CODE_TEMPLATE_ID as string,
  },

  emails: {
    sendgridFrom: process.env.SENDGRID_FROM_EMAIL || 'no-reply@vitea.dev',
  },

  kmsKeyArn: process.env.KMS_KEY_ARN as string,
};
