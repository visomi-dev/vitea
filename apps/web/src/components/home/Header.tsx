import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink as RemixNavLink } from '@remix-run/react';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import type { User } from '~/entities/auth';

import { Button } from '~/components/ui/Button';
import { Logotype } from '~/components/ui/Logotype';
import { NavLink } from '~/components/ui/NavLink';

type Props = { user: User | null };
type MobileNavLinkProps = { to: string; children: React.ReactNode };

const i18nNamespaces = ['common', 'home'];

function MobileNavLink({ to, children }: MobileNavLinkProps) {
  return (
    <Popover.Button as="div">
      <RemixNavLink className="block w-full p-2" to={to}>
        {children}
      </RemixNavLink>
    </Popover.Button>
  );
}

function MobileNavigation() {
  const { t } = useTranslation(i18nNamespaces);

  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-10 w-8 items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        aria-label="Toggle Navigation"
      >
        {({ open }) => (open ? <XMarkIcon /> : <Bars3Icon />)}
      </Popover.Button>

      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
          >
            <MobileNavLink to={t`common:routes.auth.signIn`}>
              {t`home:header.navbar.signIn`}
            </MobileNavLink>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
}

export function Header({ user }: Props) {
  const { t } = useTranslation(i18nNamespaces);

  return (
    <header className="p-4 md:py-10">
      <nav className="relative z-50 flex justify-between">
        <div className="flex items-center md:gap-x-12">
          <Logotype className="h-6 w-auto md:h-8" />
        </div>

        <div className="flex items-center gap-x-2 md:gap-x-4">
          {!user ? (
            <>
              <div className="hidden md:block">
                <NavLink to={t`common:routes.auth.signIn`}>
                  {t`home:header.navbar.signIn`}
                </NavLink>
              </div>

              <Button
                to={t`common:routes.auth.signUp`}
                color="emerald"
              >
                {t`home:header.navbar.signUp`}
              </Button>

              <div className="md:hidden">
                <MobileNavigation />
              </div>
            </>
          ) : (
            <Button to={t`common:routes.dashboard`} color="emerald">
              {t`home:header.navbar.dashboard`}
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
