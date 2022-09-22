import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

import type { DefaultLayoutComponentProps as Props, MenuItem } from '~/entities/ui';

import { SidebarMenu } from './SidebarMenu';
import { NavbarMenu } from './NavbarMenu';

export function DefaultLayout({
  children,
  className,
  sidebar = { start: [], end: [] },
  navbar = [],
}: Props) {
  const { t } = useTranslation(['common']);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarEndItems: MenuItem[] = [
    ...(sidebar?.end || ([] as MenuItem[])),
    {
      icon: <ArrowLeftOnRectangleIcon className="w-8" />,
      label: t`common:signOut`,
      link: t`common:routes.auth.signOut`,
    },
  ];

  const onToggle = () => setSidebarOpen(!sidebarOpen);

  return (
    <div
      className={clsx(
        'flex flex-col w-screen h-screen max-w-full max-h-full overflow-hidden',
        className,
      )}
    >
      <SidebarMenu
        active={sidebarOpen}
        startItems={sidebar?.start || []}
        endItems={sidebarEndItems}
        onToggle={onToggle}
      />

      <div className="relative w-full h-[calc(100vh-3rem)] flex flex-col overflow-y-auto flex-1 md:h-screen bg-gray-100">
        {children}
      </div>

      <NavbarMenu items={navbar} onToggle={onToggle} />
    </div>
  );
}
