import type { LoaderFunction, MetaFunction } from '@remix-run/node';

import { json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { useChangeLanguage } from 'remix-i18next';

import { config as configureAmplify } from '~/lib/amplify';

import i18next from './i18n/i18next.server';

import appStyles from './styles/app.css';
import sharedStyles from './styles/shared.css';

type LoaderData = { locale: string, env: Record<string, string> };

configureAmplify();

export function links() {
  return [
    { rel: 'stylesheet', href: appStyles },
    { rel: 'stylesheet', href: sharedStyles },
  ];
}

export const loader: LoaderFunction = async ({ request }) => {
  const locale = await i18next.getLocale(request);

  return json<LoaderData>({
    locale,
    env: {
      AWS_REGION: process.env.AWS_REGION as string,
      COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID as string,
      COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID as string,
      COGNITO_DOMAIN: process.env.COGNITO_DOMAIN as string,
      COGNITO_COOKIE_DOMAIN: process.env.COGNITO_COOKIE_DOMAIN as string,
      COGNITO_COOKIE_PATH: process.env.COGNITO_COOKIE_PATH as string,
      COGNITO_COOKIE_SECURE: process.env.COGNITO_COOKIE_SECURE as string,
      COGNITO_COOKIE_EXPIRES: process.env.COGNITO_COOKIE_EXPIRES as string,
    },
  });
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  const { locale, env } = useLoaderData<LoaderData>();
  const { i18n } = useTranslation();

  useChangeLanguage(locale);

  return (
    <html
      lang={locale}
      dir={i18n.dir()}
      className="w-full h-full scroll-smooth bg-white antialiased [font-feature-settings:'ss01']"
    >
      <head>
        <Meta />
        <Links />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lexend:wght@400;500&display=swap"
        />
      </head>

      <body className="w-full h-full flex flex-col">
        <Outlet />
        <ScrollRestoration />
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(
              env,
            )}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
