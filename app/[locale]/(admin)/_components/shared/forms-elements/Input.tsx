import clsx from 'clsx';

interface IInputProps {
  name: string;
  type: string;
  title: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
  touched: Record<string, boolean>;
  errors: Record<string, string | string[]>;
  className?: string;
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
}: IInputProps) {
  return (
    <label htmlFor={name} className='flex flex-col'>
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
      {touched[name] && errors[name] ? (
        <p className='mt-1 text-xs pl-2 text-red-600'>{errors[name]}</p>
      ) : null}
    </label>
  );
}
