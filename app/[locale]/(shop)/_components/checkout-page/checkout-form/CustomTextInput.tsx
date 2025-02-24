'use client';

import InputErrorMessage from './InputErrorMessage';

interface ICustomTextInputProps {
  label: string;
  type: string;
  name: string;
  errorMessage: string | undefined;
}

export default function CustomTextInput({
  label,
  type,
  name,
  errorMessage,
}: ICustomTextInputProps) {
  return (
    <label>
      <h3 className='text-sm mb-1 text-gray-600'>{label}</h3>

      <input
        type={type}
        name={name}
        className='border h-[30px] rounded-md pl-2 text-sm text-gray-500 w-full'
      />
      <InputErrorMessage message={errorMessage} />
    </label>
  );
}
