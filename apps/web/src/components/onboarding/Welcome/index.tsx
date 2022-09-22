import { useTranslation } from 'react-i18next';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import { Button } from '~/components/ui';

import { OnboardingWelcomeImage } from './Image';

const i18nNamespaces = ['common', 'onboarding'];

export function OnboardingWelcome() {
  const { t } = useTranslation(i18nNamespaces);

  const queryStepName = t`onboarding:queries.step`;
  const pathname = t`common:routes.onboarding`;
  const nextStep = t`onboarding:steps.goals`;
  const link = `${pathname}?${queryStepName}=${nextStep}`;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 animation-fade">
      <OnboardingWelcomeImage />

      <h1 className="text-3xl text-slate-900 text-center">
        {t`onboarding:welcome.title`}
      </h1>

      <h2 className="text-2xl text-slate-900 text-center">
        {t`onboarding:welcome.subtitle`}
      </h2>

      <p className="text-center">
        {t`onboarding:welcome.description`}
      </p>

      <Button className="!rounded-full !p-2 mt-4" to={link}>
        <ArrowRightIcon className="h-8" />
      </Button>
    </div>
  );
}
