'use client';

import clsx from 'clsx';
import { useLocale } from 'next-intl';
import { useCallback, useState } from 'react';
import { ActionMeta, MultiValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import AsyncSelect from 'react-select/async';

import { getAllCategories } from '@/lib/api';
import { ICategory, locale } from '@/types';

interface ICategoryAddSelectProps {
  title: string;
  placeholder?: string;
  name: string;
  onChange: (
    newValue: MultiValue<ICategory>,
    actionMeta: ActionMeta<ICategory>
  ) => void;
  value: Array<string>;
  touched: Record<string, boolean>;
  errors: Record<string, string | string[]>;
  isMain: boolean;
  className?: string;
}

export default function CategoryAddSelect({
  title,
  placeholder,
  name,
  onChange,
  touched,
  errors,
  isMain,
  value,
  className,
}: ICategoryAddSelectProps) {
  const locale = useLocale() as locale;

  const animatedComponents = makeAnimated();
  const [categories, setCategories] = useState<ICategory[]>([]);

  const loadCategories = useCallback(
    async (inputValue: string) => {
      try {
        const response = await getAllCategories(locale, { main: !isMain });
        setCategories(response);

        return response.filter(category =>
          category.name.toLowerCase().includes(inputValue.toLowerCase())
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

      <AsyncSelect<ICategory, true>
        key={isMain ? 'main' : 'sub'}
        cacheOptions={false}
        defaultOptions
        loadOptions={loadCategories}
        placeholder={placeholder}
        components={animatedComponents}
        name={name}
        getOptionLabel={category => category.name}
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
      {touched[name] && errors[name] ? (
        <p className='mt-1 text-xs pl-2 text-red-600'>{errors[name]}</p>
      ) : null}
    </div>
  );
}
