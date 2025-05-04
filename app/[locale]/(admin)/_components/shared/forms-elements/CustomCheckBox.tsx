import clsx from 'clsx';

interface ICustomCheckBoxProps {
  title: string;
  trueTitle: string;
  falseTitle: string;
  onClick: () => void;
  value: boolean;
  disabled?: boolean;
}

export default function CustomCheckBox({
  title,
  trueTitle,
  falseTitle,
  onClick,
  value,
  disabled = false,
}: ICustomCheckBoxProps) {
  return (
    <label className='flex flex-col max-w-max'>
      <span className='text-sm font-semibold mb-1'>{title}</span>

      <div className='flex items-center gap-2'>
        <span className='text-sm'>{falseTitle}</span>
        <button
          disabled={disabled}
          type='button'
          className={clsx(
            'w-12 h-6 flex items-center rounded-full cursor-pointer transition-all',
            value ? 'bg-primary' : 'bg-gray-300'
          )}
          onClick={onClick}
        >
          <div
            className={clsx(
              'w-6 h-6 rounded-full  transform transition-all',
              disabled ? 'bg-gray-400' : 'bg-white',
              value ? 'translate-x-[24px]' : 'translate-x-0'
            )}
          />
        </button>
        <span className='text-sm'>{trueTitle}</span>
      </div>
    </label>
  );
}
