import clsx from 'clsx';

import type { LoaderComponentProps as Props } from '~/entities/ui';

const points = [
  { name: 'red', className: 'text-red-500 LoaderFirstPoint' },
  { name: 'yellow', className: 'text-yellow-200 LoaderSecondPoint' },
  { name: 'green', className: 'text-green-500 LoaderThirdPoint' },
  { name: 'blue', className: 'text-blue-500 LoaderFourthPoint' },
];

export function Loader({ className }: Props) {
  return (
    <div className={clsx('flex gap-1 items-center justify-center', className)}>
      {points.map((point) => (
        <svg
          key={point.name}
          className={point.className}
          aria-hidden="true"
          viewBox="0 0 24 24"
        >
          <path
            d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
            fill="currentColor"
          />
        </svg>
      ))}
    </div>
  );
}
