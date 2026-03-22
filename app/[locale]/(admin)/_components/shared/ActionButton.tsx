import clsx from 'clsx';

interface IActionButtonProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export default function ActionButton({
  title,
  onClick,
  disabled,
  className,
}: IActionButtonProps) {
  return (
    <button
      type='button'
      disabled={disabled}
      onClick={onClick}
      className={clsx('btn btn-sm border-none', className && className)}
    >
      {title}
    </button>
  );
}
