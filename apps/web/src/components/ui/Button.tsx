import { Link } from '@remix-run/react';
import clsx from 'clsx';

import type { ButtonComponentProps as Props } from '~/entities/ui';

const baseStyles = {
  solid:
    'group inline-flex items-center justify-center rounded py-2 px-4 font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50',
  outline:
    'group inline-flex ring-1 items-center justify-center rounded py-2 px-4 focus:outline-none disabled:opacity-50',
};

const variantStyles = {
  solid: {
    slate:
      'bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900',
    white:
      'bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white',
    blue: 'bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600',
    emerald:
      'bg-emerald-300 text-gray-900 hover:text-gray-700 hover:bg-emerald-400 active:bg-emerald-600 active:text-emerald-50 focus-visible:outline-emerald-600',
  },
  outline: {
    slate:
      'ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300',
    white:
      'ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white',
    blue: 'ring-blue-600 text-white hover:text-slate-100 hover:ring-blue-500 active:ring-blue-800 active:text-blue-100 focus-visible:outline-blue-600',
    emerald:
        'ring-emerald-300 text-gray-900 hover:text-gray-700 hover:ring-emerald-400 active:bg-emerald-600 active:text-emerald-50 focus-visible:outline-emerald-600',
  },
};

const loadingClasses = '!text-transparent bg-opacity-90 pointer-events-none relative after:block after:border-2 after:border-r-transparent after:border-t-transparent after:rounded-full after:absolute after:animate-spin after:w-[1em] after:h-[1em]';

export function Button({
  variant = 'solid',
  color = 'slate',
  className,
  to,
  children,
  loading,
  ...props
}: Props) {
  const variantClassName = clsx(
    baseStyles[variant],
    variantStyles[variant][color],
    loading ? loadingClasses : undefined,
    className,
  );

  return to ? (
    <Link to={to} className={variantClassName} {...props as any}>
      {children}
    </Link>
  ) : (
    <button type="button" className={variantClassName} {...props}>
      {children}
    </button>
  );
}
