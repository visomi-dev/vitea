import { NavLink, useLocation } from '@remix-run/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import type { MenuItem } from '~/entities/ui';

type Props = {
  items: MenuItem[];
  onToggle?: () => void;
};

export function NavbarMenu({ items, onToggle }: Props) {
  const location = useLocation();

  return (
    <nav className="w-full h-12 overflow-x-auto bg-white md:hidden">
      <ul className="flex h-full">
        {items.map((item) => (
          <li
            key={item.link}
            className="h-full flex items-center justify-center flex-1"
          >
            <NavLink to={item.link} className="w-full h-full flex items-center justify-center px-1 border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              {item.icon}

              <span
                className={clsx(
                  'transition-all',
                  location.pathname === item.link
                    ? 'max-w-auto'
                    : 'overflow-hidden max-w-0',
                )}
              >
                {item.label}
              </span>
            </NavLink>
          </li>
        ))}

        <li className="h-full flex items-center justify-center flex-1">
          <button
            type="button"
            className="w-full h-full flex items-center justify-center border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            onClick={onToggle}
          >
            <Bars3Icon className="h-full" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
