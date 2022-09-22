import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import type { MenuItem } from '~/entities/ui';

import { Link } from '@remix-run/react';
import { Isotype } from './Isotype';
import { Logotype } from './Logotype';

type MenuProps = {
  active?: boolean;
  items: MenuItem[];
};

type Props = {
  active?: boolean;
  startItems: MenuItem[];
  endItems: MenuItem[];
  children?: React.ReactNode[];
  onToggle?: () => void;
};

function Menu({ active, items }: MenuProps) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li
          key={item.link}
          className={clsx('flex items-center w-full', item.className)}
        >
          <Link
            to={item.link}
            className={clsx(
              'flex w-full items-center p-2 gap-2 font-medium rounded-md',
            )}
          >
            {item.icon}

            <span
              className={clsx(
                'transition-all overflow-hidden',
                active ? 'md:max-w-xs' : 'md:max-w-0 h-0',
              )}
            >
              {item.label}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SidebarMenu({
  active,
  startItems,
  endItems,
  onToggle,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (active && onToggle) {
          onToggle();
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, active]);

  return (
    <div
      className={clsx(
        'transition-all sm:fixed sm:h-screen sm:bg-gray-400 sm:bg-opacity-75 sm:z-50',
        active ? 'overflow-y-auto sm:w-screen' : 'sm:w-0 overflow-hidden',
      )}
    >
      <aside
        ref={ref}
        className="flex flex-col transition-all h-screen max-h-full overflow-x-hidden bg-white border-r border-gray-200 sm:w-[calc(100vw-4rem)] md:sticky"
      >
        <Logotype className={clsx('w-full h-16 p-4', !active && 'md:hidden')} />

        <Isotype
          className={clsx('w-full p-4 sm:hidden', active && 'md:block')}
        />

        <nav className="flex flex-col p-4 gap-4">
          <Menu active={active} items={startItems} />
        </nav>

        <div className="flex-1" />

        {children}

        <nav className="flex flex-col p-4 gap-4">
          <Menu active={active} items={endItems} />
        </nav>
      </aside>

      <button
        type="button"
        className="control hidden md:flex items-center justify-center h-5 w-5 absolute rounded-full text-secondary-50 bg-secondary-900 hover:bg-secondary-700 border dark:border-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
        onClick={onToggle}
      >
        {active ? (
          <ChevronLeftIcon className="w-4" />
        ) : (
          <ChevronRightIcon className="w-4" />
        )}
      </button>
    </div>
  );
}
