'use client';

import clsx from 'clsx';

interface IRadioInputProps {
  option: {
    title: string;
    value: string;
    name: string;
    selected: string;
    setSelected: (value: string) => void;
  };
}

export default function RadioInput({ option }: IRadioInputProps) {
  const { title, value, name, selected, setSelected } = option;

  return (
    <label className='relative flex items-center gap-2 cursor-pointer rounded-md p-2'>
      <input
        type='radio'
        name={name}
        value={value}
        checked={selected === value}
        onChange={() => setSelected(value)}
        className='hidden'
      />
      <span
        className={clsx(
          'w-5 h-5 flex items-center justify-center border-2 rounded-full',
          selected === value
            ? 'border-primary bg-primary'
            : 'border-gray-300 bg-white'
        )}
      >
        {selected === value && (
          <span className='w-2.5 h-2.5 bg-white rounded-full'></span>
        )}
      </span>
      <h3 className='text-sm text-gray-600'>{title}</h3>
    </label>
  );
}
