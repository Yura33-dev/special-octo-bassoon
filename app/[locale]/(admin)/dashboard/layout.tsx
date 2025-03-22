import { ClerkProvider } from '@clerk/nextjs';
import { Fira_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Toaster } from 'sonner';

import { routing } from '@/i18n/routing';
import { locale } from '@/types';
import '@/app/globals.css';

import Header from '../_components/shared/Header';
import SideBar from '../_components/shared/SideBar';

const fira = Fira_Sans({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '700', '600', '800', '900'],
  display: 'swap',
});

export default async function DashboardLayout({
  children,
  modal,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
  params: { locale: locale };
}>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const translations = await getMessages();

  return (
    <ClerkProvider>
      <html lang={locale}>
        <body className={`${fira.className} subpixel-antialiased`}>
          <NextIntlClientProvider messages={translations}>
            <Header />
            <div className='flex min-h-screen'>
              <SideBar className='bg-background flex-shrink-0 shadow-md h-screen sticky top-0 pt-20' />
              <main className='basis-full flex-grow mt-28 mb-24'>
                {modal}
                {children}
              </main>
            </div>

            <Toaster richColors />
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
