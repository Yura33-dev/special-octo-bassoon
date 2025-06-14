'use client';

import clsx from 'clsx';
import { FormikErrors, FormikTouched } from 'formik';
import { get } from 'lodash';
import { useLocale } from 'next-intl';
import { useCallback, useState } from 'react';
import { ActionMeta, MultiValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import AsyncSelect from 'react-select/async';

import { getAllCategories } from '@/lib/api';
import { ICategoryMapped, locale } from '@/types';

interface ICategoryAddSelectProps<T> {
  title: string;
  placeholder?: string;
  name: string;
  onChange: (
    newValue: MultiValue<ICategoryMapped>,
    actionMeta: ActionMeta<ICategoryMapped>
  ) => void;
  value: Array<string>;
  touched: FormikTouched<T>;
  errors: FormikErrors<T>;
  isMain: boolean;
  className?: string;
}

export default function CategoryAddSelect<T>({
  title,
  placeholder,
  name,
  onChange,
  touched,
  errors,
  isMain,
  value,
  className,
}: ICategoryAddSelectProps<T>) {
  const locale = useLocale() as locale;

  const animatedComponents = makeAnimated();
  const [categories, setCategories] = useState<ICategoryMapped[]>([]);

  const loadCategories = useCallback(
    async (inputValue: string) => {
      try {
        const response = await getAllCategories({ main: !isMain });
        setCategories(response);

        return response.filter(category =>
          category.name[locale].toLowerCase().includes(inputValue.toLowerCase())
        );
      } catch (error) {
        console.error('Ошибка загрузки категорий', error);
        return [];
      }
    },
    [isMain, locale]
  );

  const selectedCategories = categories.filter(cat => value.includes(cat.id));

  return (
    <div className={clsx(className && className)}>
      <span className='block text-sm font-semibold mb-1'>{title}</span>

      <AsyncSelect<ICategoryMapped, true>
        key={isMain ? 'main' : 'sub'}
        cacheOptions={false}
        defaultOptions
        loadOptions={loadCategories}
        placeholder={placeholder}
        components={animatedComponents}
        name={name}
        getOptionLabel={category => category.name[locale]}
        getOptionValue={category => category.id}
        isMulti
        onChange={onChange}
        value={selectedCategories}
        classNames={{
          container: ({ isFocused }) => (isFocused ? 'cursor-pointer' : ''),
          option: ({ isSelected, isFocused }) =>
            isSelected
              ? '!bg-primary !text-white'
              : isFocused
                ? '!bg-teal-700 !cursor-pointer !text-white'
                : '!bg-white !text-black',
          control: ({ isFocused }) =>
            isFocused
              ? '!border-none !ring-offset-0 !ring-2 !ring-primary'
              : '!border-none !ring-offset-0 !ring-1 !ring-primary',
          placeholder: () => 'text-sm',
        }}
      />
      {get(touched, name) && get(errors, name) ? (
        <p className='mt-1 text-xs pl-2 text-red-600'>{get(errors, name)}</p>
      ) : null}
    </div>
  );
}
