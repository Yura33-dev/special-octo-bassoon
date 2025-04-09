/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import clsx from 'clsx';
import { FormikErrors, FormikTouched } from 'formik';
import { get } from 'lodash';
import { useId } from 'react';
import { ActionMeta, SingleValue } from 'react-select';
import Select from 'react-select';

import { formattedPackValue } from '@/lib/utils';
import { IPackagingMapped } from '@/types';

interface IPackagingSelectProps {
  packaging: Array<IPackagingMapped>;
  title?: string;
  placeholder?: string;
  name: string;
  value: IPackagingMapped | null;
  touched: FormikTouched<any>;
  errors: FormikErrors<any>;
  onChange: (
    newValue: SingleValue<IPackagingMapped>,
    actionMeta: ActionMeta<IPackagingMapped>
  ) => void;
  className?: string;
}

export default function PackagingSelect({
  packaging,
  title,
  placeholder,
  name,
  onChange,
  value,
  touched,
  errors,
  className,
}: IPackagingSelectProps) {
  const errorMessage = get(errors, name);

  return (
    <div className={clsx(className && className)}>
      {title && (
        <span className='block text-sm font-semibold mb-1'>{title}</span>
      )}

      <Select<IPackagingMapped, false>
        instanceId={useId()}
        placeholder={placeholder}
        name={name}
        options={packaging}
        getOptionLabel={pack =>
          formattedPackValue(
            pack.translatedData['uk'].type,
            pack.translatedData['uk'].measureValue,
            pack.translatedData['uk'].measureIn
          )
        }
        getOptionValue={pack => pack.id}
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
