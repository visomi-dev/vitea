import type { LoaderFunction, MetaFunction } from '@remix-run/node';

import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import type { User } from '~/entities/auth';

import { getUserFromRequest } from '~/lib/auth/user';
import i18next from '~/i18n/i18next.server';

import { Header } from '~/components/home/Header';
import { Hero } from '~/components/home/Hero';

type LoaderData = { title: string; user: User | null };

const i18nNamespaces = ['common', 'home'];

export const handle = {
  i18n: i18nNamespaces,
};

export const loader: LoaderFunction = async ({ request }) => {
  const [user, t] = await Promise.all([
    getUserFromRequest(request),
    i18next.getFixedT(request, i18nNamespaces),
  ]);

  return json<LoaderData>({ title: t('home:title'), user });
};

export const meta: MetaFunction = ({ data }: { data: LoaderData }) => ({
  title: data.title,
});

export default function Index() {
  const { user } = useLoaderData<LoaderData>();

  return (
    <>
      <Header user={user} />

      <main className="flex flex-col w-screen max-w-screen p-2">
        <Hero />
      </main>
    </>
  );
}
