'use client';

import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { ChangeEvent } from 'react';

import { routing, usePathname, useRouter } from '@/i18n/routing';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const urlString =
      searchParams.toString().length > 0
        ? `${pathName}?${searchParams.toString()}`
        : `${pathName}`;

    router.replace(urlString, { locale: e.target.value });
  };

  return (
    <select defaultValue={locale} onChange={e => handleChange(e)}>
      {routing.locales.map(cur => (
        <option key={cur} value={cur}>
          {t('label', { locale: cur })}
        </option>
      ))}
    </select>
  );
}
