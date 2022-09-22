import { NavLink as RemixNavLink } from '@remix-run/react';

export function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <RemixNavLink to={to} className="inline-block rounded-lg py-2 px-4 text-slate-700 hover:bg-slate-100 hover:text-slate-900">
      {children}
    </RemixNavLink>
  );
}
