import type { Environment } from '~/entities';

declare global {
  interface Window {
    env: Record<string, string>;
  }
}

const domain = typeof window === 'undefined' ? process.env.COGNITO_COOKIE_DOMAIN as string : window.env?.COGNITO_COOKIE_DOMAIN;
const path = typeof window === 'undefined' ? process.env.COGNITO_COOKIE_PATH as string : window.env?.COGNITO_COOKIE_PATH;
const secure = typeof window === 'undefined' ? process.env.COGNITO_COOKIE_SECURE : window.env?.COGNITO_COOKIE_SECURE;
const expires = typeof window === 'undefined' ? process.env.COGNITO_COOKIE_EXPIRES : window.env?.COGNITO_COOKIE_EXPIRES;

export const environment: Environment = {
  aws: {
    region: typeof window === 'undefined' ? process.env.AWS_REGION as string : window.env?.AWS_REGION,
    auth: {
      userPoolId: typeof window === 'undefined'
        ? process.env.COGNITO_USER_POOL_ID as string
        : window.env.COGNITO_USER_POOL_ID,
      webClientId: typeof window === 'undefined'
        ? process.env.COGNITO_CLIENT_ID as string
        : window.env?.COGNITO_CLIENT_ID,
      cookieStorage: {
        domain,
        path,
        secure: JSON.parse(secure as string),
        expires: parseInt(expires as string, 10),
      },

      oauth: {
        domain: typeof window === 'undefined' ? process.env.COGNITO_DOMAIN as string : window.env?.COGNITO_DOMAIN,
      },
    },
  },
};
