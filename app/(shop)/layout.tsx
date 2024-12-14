import type { Metadata } from 'next';
import { Fira_Sans } from 'next/font/google';
import { Toaster } from 'sonner';

import '@/app/globals.css';

import Footer from './_components/shared/main-footer/Footer';
import Header from './_components/shared/main-header/Header';
import MobileMenu from './_components/shared/mobile-menu/MobileMenu';

const fira = Fira_Sans({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '700', '600', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Насіння оптом та в роздріб з доставкою по всій Україні',
  description:
    'Купити насіння з доставкою по Україні. Інтернет магазин продажу насіння.✔️Гарантія якості ✔️Вигідні ціни ✔️Швидка доставка',
};

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='uk'>
      <body
        className={`${fira.className} subpixel-antialiased min-h-[100dvh] flex flex-col relative`}
      >
        <Header />
        <main className='flex-shrink-0 flex-grow basis-full'>{children}</main>
        <Footer />

        <MobileMenu />
        <Toaster richColors />
      </body>
    </html>
  );
}
