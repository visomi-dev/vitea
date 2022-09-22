import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';

import i18next from '~/i18n/i18next.server';
import { getUserFromRequest } from '~/lib/auth/user';

import { DefaultLayout } from '~/components/ui';
import { prisma } from '~/utils/prisma.server';

const i18nNamespaces = ['common', 'authentication'];

export const handle = {
  i18n: i18nNamespaces,
};

export const loader: LoaderFunction = async ({ request }) => {
  const [t, user] = await Promise.all([
    i18next.getFixedT(request, i18nNamespaces),
    getUserFromRequest(request),
  ]);

  if (!user) {
    return redirect(t`common:routes.auth.signIn`);
  }

  const ledgers = await prisma.ledger.count({
    where: {
      owner: user.id,
    },
  });

  if (ledgers === 0) {
    return redirect(t`common:routes.onboarding`);
  }

  return null;
};

export default function Dashboard() {
  return (
    <DefaultLayout>
      Dashboard Component
    </DefaultLayout>
  );
}
