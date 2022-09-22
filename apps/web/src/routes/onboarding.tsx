import { useTranslation } from 'react-i18next';
import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useSearchParams } from '@remix-run/react';

import i18next from '~/i18n/i18next.server';
import { getUserFromRequest } from '~/lib/auth/user';

import { DefaultLayout } from '~/components/ui';
import { OnboardingGoals } from '~/components/onboarding/Goals';
import { OnboardingWelcome } from '~/components/onboarding/Welcome';

const i18nNamespaces = ['common', 'onboarding'];

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

  return null;
};

export default function Onboarding() {
  const { t } = useTranslation(i18nNamespaces);
  const [queryParams] = useSearchParams();

  let content: JSX.Element;

  const queryStepName = t('onboarding:queries.step', 'step');
  const queryStepValue = queryParams.get(queryStepName) || 'welcome';

  switch (queryStepValue) {
    case t`onboarding:steps.goals`:
      content = <OnboardingGoals />;

      break;
    case t`onboarding:steps.welcome`:
    default:
      content = <OnboardingWelcome />;

      break;
  }

  return (
    <DefaultLayout>
      <main className="w-full h-full p-4">{content}</main>
    </DefaultLayout>
  );
}
