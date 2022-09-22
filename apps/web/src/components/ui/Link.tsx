import { Link as RemixLink } from '@remix-run/react';
import clsx from 'clsx';

import type { LinkComponentProps as Props } from '~/entities/ui';

const baseClasses = 'font-medium text-gray-800 underline hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500';

export function Link({ to, children, className }: Props) {
  return (
    <RemixLink to={to} className={clsx(baseClasses, className)}>
      {children}
    </RemixLink>
  );
}
