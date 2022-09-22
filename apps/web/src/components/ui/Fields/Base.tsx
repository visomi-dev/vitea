import type { LabelComponentProps as Props } from '~/entities/ui';

export const fieldClasses = 'control flex flex-col gap-1';
export const formClasses = 'w-full appearance-none rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-emerald-500 disabled:opacity-75';

export function Label({ id, children }: Props) {
  return (
    <label htmlFor={id} className="text-gray-700">
      {children}
    </label>
  );
}
