export type Environment = {
  aws: {
    region: string;
    auth: {
      userPoolId: string;
      webClientId: string;
      cookieStorage: {
        domain: string;
        secure: boolean;
        path: string;
        expires: number;
      }

      oauth: {
        domain: string;
      };
    };
  };
};

export type CustomError = Error & { code: string };
