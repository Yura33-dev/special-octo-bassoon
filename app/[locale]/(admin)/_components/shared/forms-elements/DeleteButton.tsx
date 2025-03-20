import { Trash2 } from 'lucide-react';

interface IDeleteButtonProps {
  title?: string;
  onClick: () => void;
}

export default function DeleteButton({ onClick, title }: IDeleteButtonProps) {
  return (
    <button
      type='button'
      className='flex items-center gap-2 bg-teal-800/20 transition-colors px-4 py-2 rounded-md hover:bg-red-600
                  hover:text-white'
      onClick={onClick}
    >
      <Trash2 className='w-4 h-4' />
      <span>{title ? title : 'Видалити'}</span>
    </button>
  );
}
