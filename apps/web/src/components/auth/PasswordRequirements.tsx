import { useTranslation } from 'react-i18next';
import { CheckIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

type Props = {
  password: string;
  className?: string;
};

const iconBaseStyle = 'flex justify-center items-center h-4 w-4 border rounded-full transition-all';
const iconPassRequirement = 'text-green-600 border-green-600';
const iconEmptyStyle = 'text-transparent border-gray-600';

const textBaseStyle = 'transition-all pb-[0.045rem]';
const textPassRequirement = 'text-green-600 border-green-600';
const textEmptyStyle = 'text-gray-600';

export function PasswordRequirements({ className, password }: Props) {
  const { t } = useTranslation(['authentication']);

  const hasUpperCase = /[A-Z]{1,}/.test(password);
  const hasLowerCase = /[a-z]{1,}/.test(password);
  const hasNumber = /[0-9]{1,}/.test(password);
  const hasSpecialCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{1,}/.test(
    password,
  );

  return (
    <div className={className}>
      <p className="text-primary-700 dark:text-primary-200">
        {t`authentication:passwordRequirements.title`}
      </p>

      <ul>
        <li className="flex items-center gap-1">
          <CheckIcon
            className={clsx(
              iconBaseStyle,
              hasUpperCase ? iconPassRequirement : iconEmptyStyle,
            )}
          />

          <span
            className={clsx(
              textBaseStyle,
              hasUpperCase ? textPassRequirement : textEmptyStyle,
            )}
          >
            {t`authentication:passwordRequirements.upperCase`}
          </span>
        </li>

        <li className="flex items-center gap-1">
          <CheckIcon
            className={clsx(
              iconBaseStyle,
              hasLowerCase ? iconPassRequirement : iconEmptyStyle,
            )}
          />

          <span
            className={clsx(
              textBaseStyle,
              hasLowerCase ? textPassRequirement : textEmptyStyle,
            )}
          >
            {t`authentication:passwordRequirements.lowerCase`}
          </span>
        </li>

        <li className="flex items-center gap-1">
          <CheckIcon
            className={clsx(
              iconBaseStyle,
              hasNumber ? iconPassRequirement : iconEmptyStyle,
            )}
          />

          <span
            className={clsx(
              textBaseStyle,
              hasNumber ? textPassRequirement : textEmptyStyle,
            )}
          >
            {t`authentication:passwordRequirements.number`}
          </span>
        </li>

        <li className="flex items-center gap-1">
          <CheckIcon
            className={clsx(
              iconBaseStyle,
              hasSpecialCharacter ? iconPassRequirement : iconEmptyStyle,
            )}
          />

          <span
            className={clsx(
              textBaseStyle,
              hasSpecialCharacter ? textPassRequirement : textEmptyStyle,
            )}
          >
            {t`authentication:passwordRequirements.specialCharacter`}
          </span>
        </li>

        <li className="flex items-center gap-1">
          <CheckIcon
            className={clsx(
              iconBaseStyle,
              password.length > 7 ? iconPassRequirement : iconEmptyStyle,
            )}
          />

          <span
            className={clsx(
              textBaseStyle,
              password.length > 7 ? textPassRequirement : textEmptyStyle,
            )}
          >
            {t`authentication:passwordRequirements.length`}
          </span>
        </li>
      </ul>
    </div>
  );
}
