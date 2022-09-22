import clsx from 'clsx';

import type { TextFieldComponentProps as Props } from '~/entities/ui';

import { fieldClasses, formClasses, Label } from './Base';

export function TextField({
  id,
  label,
  type = 'text',
  className = '',
  errorMessage,
  ...props
}: Props) {
  return (
    <div className={clsx(fieldClasses, className)}>
      {label && <Label id={id}>{label}</Label>}

      <input id={id} type={type} className={formClasses} {...props} />

      {errorMessage && (
        <p className="error transition-all overflow-hidden text-red-400">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
