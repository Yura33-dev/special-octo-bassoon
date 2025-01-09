'use client';

import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useId } from 'react';
import Select from 'react-select';

import { routing, usePathname, useRouter } from '@/i18n/routing';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (
    selectedOption: { label: string; value: string } | null
  ) => {
    if (!selectedOption) return;

    const urlString =
      searchParams.toString().length > 0
        ? `${pathName}?${searchParams.toString()}`
        : `${pathName}`;

    router.replace(urlString, { locale: selectedOption.value });
  };

  const options = routing.locales.map(cur => ({
    label: `${t('locale', { locale: cur })}`,
    value: cur,
  }));

  return (
    <Select
      instanceId={useId()}
      options={options}
      onChange={handleChange}
      isSearchable={false}
      defaultValue={{
        label: `${t('locale', { locale: locale })}`,
        value: locale,
      }}
      classNames={{
        container: ({ isFocused }) =>
          isFocused ? 'w-[160px] mx-auto cursor-pointer' : 'w-[160px] mx-auto',
        option: ({ isSelected, isFocused }) =>
          isSelected
            ? '!bg-accent !text-white'
            : isFocused
              ? '!bg-orange-200 !cursor-pointer !text-black'
              : '!bg-white !text-black',
        control: ({ isFocused }) =>
          isFocused
            ? '!border-none !ring-offset-0 !ring-2 !ring-accent'
            : '!border-none ',
      }}
    />
  );
}
