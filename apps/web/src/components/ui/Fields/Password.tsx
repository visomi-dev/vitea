import type { KeyboardEvent } from 'react';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import type { PasswordFieldComponentProps as Props } from '~/entities/ui';

import { fieldClasses, formClasses, Label } from './Base';

const toggleShowPasswordClasses = 'text-gray-900 absolute top-2.5 right-2.5 h-6 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500';

export function PasswordField({
  id,
  label,
  className = '',
  pattern = '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[$&+,:;=?@#|\'<>.^*()%!-]).{8,50}',
  min = 8,
  errorMessage,
  children,
  ...props
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = (event?: KeyboardEvent) => {
    if (!event || event?.code === 'Space') {
      setShowPassword(!showPassword);
    }
  };

  return (
    <div className={clsx(fieldClasses, className)}>
      {label && <Label id={id}>{label}</Label>}

      <div className="relative flex flex-col gap-1">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          pattern={pattern}
          min={min}
          className={formClasses}
          {...props}
        />

        {!showPassword ? (
          <EyeIcon
            className={toggleShowPasswordClasses}
            tabIndex={0}
            onClick={() => toggleShowPassword()}
            onKeyUp={(event) => toggleShowPassword(event)}
          />
        ) : (
          <EyeSlashIcon
            className={toggleShowPasswordClasses}
            tabIndex={0}
            onClick={() => toggleShowPassword()}
            onKeyUp={(event) => toggleShowPassword(event)}
          />
        )}

        {errorMessage && (
          <p className="error transition-all overflow-hidden text-red-400">
            {errorMessage}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}
