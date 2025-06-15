/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import clsx from 'clsx';
import { FormikErrors, FormikTouched } from 'formik';
import { get } from 'lodash';

interface ITextAreaProps {
  name: string;
  title: string;
  placeholer?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  value: string | null;
  touched: FormikTouched<any>;
  errors: FormikErrors<any>;
  className?: string;
  labelClassName?: string;
}

export default function TextArea({
  name,
  title,
  placeholer,
  onChange,
  onBlur,
  value,
  touched,
  errors,
  className,
  labelClassName,
}: ITextAreaProps) {
  const errorMessage = get(errors, name);

  return (
    <label
      htmlFor={name}
      className={clsx('flex flex-col', labelClassName && labelClassName)}
    >
      <span className='text-sm font-semibold mb-1'>{title}</span>
      <textarea
        placeholder={placeholer}
        id={name}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value ?? undefined}
        className={clsx(
          'p-1 pl-3 text-gray-600 rounded-md text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-primary',
          'placeholder:text-xs',
          className && className
        )}
      ></textarea>
      {get(touched, name) && get(errors, name) ? (
        <p className='mt-1 text-xs pl-2 text-red-600'>
          {typeof errorMessage === 'string'
            ? errorMessage
            : Array.isArray(errorMessage)
              ? errorMessage.join(', ')
              : null}
        </p>
      ) : null}
    </label>
  );
}
