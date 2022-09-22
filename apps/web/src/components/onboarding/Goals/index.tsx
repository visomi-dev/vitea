import { useTranslation } from 'react-i18next';

import { Button } from '~/components/ui';

import { OnboardingGoalsImage } from './Image';

const i18nNamespaces = ['common', 'onboarding'];

export function OnboardingGoals() {
  const { t } = useTranslation(i18nNamespaces);

  const queryStepName = t`onboarding:queries.step`;
  const pathname = t`common:routes.onboarding`;
  const nextStep = t`onboarding:steps.budgets`;
  const link = `${pathname}?${queryStepName}=${nextStep}`;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 animation-fade">
      <ul>
        <li>
          <OnboardingGoalsImage />

          <h1 className="text-3xl text-slate-900 text-center">
            {t`onboarding:start.title`}
          </h1>

          <h2 className="text-2xl text-slate-900 text-center">
            {t`onboarding:start.subtitle`}
          </h2>

          <p className="text-center">
            {t`onboarding:start.description`}
          </p>

          <Button className="mt-4" to={link}>
            {t`onboarding:setups.submit`}
          </Button>
        </li>
      </ul>
    </div>
  );
}
