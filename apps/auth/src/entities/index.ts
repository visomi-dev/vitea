export type Environment = {
  sendgrid: {
    apiKey: string;
    verificationCodeTemplateId: string;
    passwordResetTemplateId: string;
  };
  emails: {
    sendgridFrom: string;
  };
  kmsKeyArn: string;
};
