/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx';
import { FormikErrors, FormikTouched } from 'formik';
import { get } from 'lodash';

interface IInputProps {
  name: string;
  type: string;
  title: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
  touched: FormikTouched<any>;
  errors: FormikErrors<any>;
  className?: string;
  labelClassName?: string;
}

export default function Input({
  name,
  title,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  touched,
  errors,
  className,
  labelClassName,
}: IInputProps) {
  const errorMessage = get(errors, name);

  return (
    <label
      htmlFor={name}
      className={clsx('flex flex-col', labelClassName && labelClassName)}
    >
      <span className='text-sm font-semibold mb-1'>{title}</span>
      <input
        id={name}
        name={name}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        className={clsx(
          'w-full p-1 pl-3 text-gray-600 rounded-md text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-primary',
          'placeholder:text-xs',
          className && className
        )}
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
    </label>
  );
}
