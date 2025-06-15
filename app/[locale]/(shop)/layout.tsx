import { Fira_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Suspense } from 'react';
import { Toaster } from 'sonner';

import { routing } from '@/i18n/routing';
import { locale } from '@/types';
import '@/app/globals.css';

import Footer from './_components/shared/main-footer/Footer';
import FooterSkeleton from './_components/shared/main-footer/FooterSkeleton';
import Header from './_components/shared/main-header/Header';
import MobileMenu from './_components/shared/mobile-menu/MobileMenu';

const fira = Fira_Sans({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '700', '600', '800', '900'],
  display: 'swap',
});

export default async function ShopLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: locale };
}>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const translations = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${fira.className} subpixel-antialiased min-h-[100dvh] flex flex-col relative`}
      >
        <NextIntlClientProvider messages={translations}>
          <Header />
          <main className='flex-shrink-0 flex-grow basis-full'>{children}</main>

          <Suspense fallback={<FooterSkeleton />}>
            <Footer />
          </Suspense>

          <MobileMenu />
          <Toaster richColors />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
