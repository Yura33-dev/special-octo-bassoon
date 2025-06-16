import clsx from 'clsx';
import { LoaderCircle, Save } from 'lucide-react';

interface ISubmitButtonProps {
  title: string;
  isSubmitting: boolean;
  className?: string;
  onClick?: () => void;
  buttonType?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
}

export default function SubmitButton({
  title,
  isSubmitting,
  className,
  onClick,
  buttonType = 'submit',
  disabled = false,
}: ISubmitButtonProps) {
  return (
    <button
      onClick={onClick}
      type={buttonType}
      className={clsx(
        `w-full md:max-w-32 h-10 bg-primary rounded-md transition-all ease-linear
                        active:scale-90 hover:bg-primary-dark disabled:bg-gray-300`,
        isSubmitting
          ? 'text-primary flex items-center justify-center'
          : 'text-white block',
        className && className
      )}
      disabled={disabled || isSubmitting}
    >
      {isSubmitting ? (
        <LoaderCircle className='w-8 h-8 animate-spin' />
      ) : (
        <div className='flex items-center justify-center gap-2'>
          <Save className='w-5 h-5' focusable='false' aria-hidden />
          <span>{title}</span>
        </div>
      )}
    </button>
  );
}
