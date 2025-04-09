/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import clsx from 'clsx';
import { FormikErrors, FormikTouched } from 'formik';
import { get } from 'lodash';
import { useId } from 'react';
import { SingleValue } from 'react-select';
import Select from 'react-select';

import { ICategoryMapped } from '@/types';

interface ICategoriesSelectProps {
  categories:
    | Array<ICategoryMapped>
    | Array<Omit<ICategoryMapped, 'childCategories' | 'parentCategories'>>;
  title?: string;
  placeholder: string;
  name: string;
  onChange: (
    newValue: SingleValue<
      | ICategoryMapped
      | Omit<ICategoryMapped, 'childCategories' | 'parentCategories'>
    >
  ) => void;
  value:
    | ICategoryMapped
    | Omit<ICategoryMapped, 'childCategories' | 'parentCategories'>
    | null;
  touched: FormikTouched<any>;
  errors: FormikErrors<any>;
  className?: string;
}

export default function CategoriesSelect({
  categories,
  title,
  placeholder,
  name,
  onChange,
  value,
  touched,
  errors,
  className,
}: ICategoriesSelectProps) {
  const errorMessage = get(errors, name);

  return (
    <div className={clsx(className && className)}>
      {title && (
        <span className='block text-sm font-semibold mb-1'>{title}</span>
      )}
      <Select<
        | ICategoryMapped
        | Omit<ICategoryMapped, 'childCategories' | 'parentCategories'>,
        false
      >
        instanceId={useId()}
        placeholder={placeholder}
        name={name}
        options={categories}
        getOptionLabel={category => category.name['uk']}
        getOptionValue={category => category.id}
        value={value}
        onChange={onChange}
        classNames={{
          container: ({ isFocused }) => (isFocused ? '!cursor-pointer' : ''),
          option: ({ isSelected, isFocused }) =>
            isSelected
              ? '!bg-primary !text-white'
              : isFocused
                ? '!bg-teal-700 !cursor-pointer !text-white'
                : '!bg-white !text-black',
          control: ({ isFocused }) =>
            isFocused
              ? '!border-none !ring-offset-0 !ring-2 !ring-primary'
              : '!border-none !ring-offset-0 !ring-1 !ring-primary !cursor-pointer',
          placeholder: () => '!text-sm',
        }}
      />
      {get(touched, name) && get(errors, name) ? (
        <p className='mt-1 text-xs pl-2 text-red-600'>
          {typeof errorMessage === 'string'
            ? errorMessage
            : Array.isArray(errorMessage)
              ? errorMessage.join(', ')
              : null}
        </p>
      ) : null}
    </div>
  );
}
