import clsx from 'clsx';

interface ICustomCheckBoxProps {
  title: string;
  trueTitle: string;
  falseTitle: string;
  onClick: () => void;
  value: boolean;
}

export default function CustomCheckBox({
  title,
  trueTitle,
  falseTitle,
  onClick,
  value,
}: ICustomCheckBoxProps) {
  return (
    <label className='flex flex-col'>
      <span className='text-sm font-semibold mb-1'>{title}</span>

      <div className='flex items-center gap-2'>
        <span className='text-sm'>{falseTitle}</span>
        <div
          className={clsx(
            'w-12 h-6 flex items-center bg-gray-300 rounded-full cursor-pointer transition-all',
            value ? 'bg-primary' : 'bg-gray-300'
          )}
          onClick={onClick}
        >
          <div
            className={clsx(
              'w-6 h-6 bg-white rounded-full  transform transition-transform',
              value ? 'translate-x-[24px]' : 'translate-x-0'
            )}
          />
        </div>
        <span className='text-sm'>{trueTitle}</span>
      </div>
    </label>
  );
}
