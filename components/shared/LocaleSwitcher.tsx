'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useId } from 'react';
import Select from 'react-select';

import { routing, usePathname, useRouter } from '@/i18n/routing';
import { getLocalizedSlugs } from '@/lib/utils';
import { locale } from '@/types';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');

  const locale = useLocale();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();

  const handleChange = async (
    selectedOption: { label: string; value: string } | null
  ) => {
    if (!selectedOption) return;

    if (pathName.includes('catalog')) {
      const pathSegments = pathName
        .replace(/^\/catalog\/?/, '')
        .split('/')
        .filter(Boolean);

      const mainCategorySlug = params.mainCategorySlug as string | undefined;
      const subCategorySlug = params.subCategorySlug as string | undefined;
      const productSlug = params.productSlug as string | undefined;

      const dynamicSegmentsCount = [
        mainCategorySlug,
        subCategorySlug,
        productSlug,
      ].filter(Boolean).length;

      const staticSegments = pathSegments.slice(dynamicSegmentsCount);
      const staticPath =
        staticSegments.length > 0 ? `/${staticSegments.join('/')}` : '';

      if (dynamicSegmentsCount > 0) {
        const localizedSlugs = await getLocalizedSlugs(
          {
            mainCategorySlug: mainCategorySlug || null,
            subCategorySlug: subCategorySlug || null,
            productSlug: productSlug || null,
          },
          locale as locale,
          selectedOption.value as locale
        );

        const mainCategoryLink = `${localizedSlugs.mainCategorySlug ? `/${localizedSlugs.mainCategorySlug}` : ''}`;
        const subCategoryLink = `${localizedSlugs.subCategorySlug ? `/${localizedSlugs.subCategorySlug}` : ''}`;
        const productLink = `${localizedSlugs.productSlug ? `/${localizedSlugs.productSlug}` : ''}`;

        const generatePath = `/catalog${mainCategoryLink}${subCategoryLink}${productLink}${staticPath}`;
        const newPath = generatePath.length === 0 ? '/' : generatePath;

        const urlString =
          searchParams.toString().length > 0
            ? `${newPath}?${searchParams.toString()}`
            : `${newPath}`;

        router.replace(urlString, { locale: selectedOption.value });
      } else {
        const generatePath = `/catalog${staticPath}`;
        const urlString =
          searchParams.toString().length > 0
            ? `${generatePath}?${searchParams.toString()}`
            : `${generatePath}`;

        router.replace(urlString, { locale: selectedOption.value });
      }
    } else {
      const urlString =
        searchParams.toString().length > 0
          ? `${pathName}?${searchParams.toString()}`
          : `${pathName}`;

      router.replace(urlString, { locale: selectedOption.value });
    }
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
