import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';

import {
  Outlet, Link, useLocation,
} from '@remix-run/react';

import i18next from '~/i18n/i18next.server';
import { getUserFromRequest } from '~/lib/auth/user';

import { Logotype } from '~/components/ui/Logotype';
import { useTranslation } from 'react-i18next';

const i18nNamespaces = ['common', 'authentication'];

export const handle = {
  i18n: i18nNamespaces,
};

export const loader: LoaderFunction = async ({ request }) => {
  const [t, user] = await Promise.all([
    i18next.getFixedT(request, i18nNamespaces),
    getUserFromRequest(request),
  ]);

  if (user) {
    return redirect(t`common:routes.dashboard`);
  }

  const { pathname } = new URL(request.url);

  if (pathname === t`common:routes.auth.base`) {
    return redirect(t`common:routes.auth.signIn`);
  }

  return null;
};

export default function Authentication() {
  const { t } = useTranslation(i18nNamespaces);
  const location = useLocation();

  const [,, page] = location.pathname.split('/');

  const title = t([`headings.titles.${page}`], { ns: 'authentication' });

  return (
    <div className="flex flex-col justify-center items-center max-w-full w-screen min-h-screen p-4 bg-gray-50 overflow-x-hidden overflow-y-auto md:p-8">
      <Link to="/" className="w-full max-w-xs">
        <Logotype className="w-full" />
      </Link>

      <h1 className="my-8 text-center text-4xl font-extrabold text-gray-900 leading-9 max-w-md">
        {title}
      </h1>

      <div className="flex flex-col gap-4 max-w-md md:shadow md:rounded md:p-6 md:bg-white">
        <Outlet />
      </div>
    </div>
  );
}
