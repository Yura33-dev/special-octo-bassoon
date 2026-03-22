import { Trash2 } from 'lucide-react';

interface IDeleteActionButtonProps {
  onClick?: () => void;
  disable?: boolean;
}

export default function DeleteActionButton({
  onClick,
  disable,
}: IDeleteActionButtonProps) {
  return (
    <button
      type='button'
      disabled={disable}
      onClick={onClick}
      className='btn btn-sm bg-red-500 hover:bg-red-600 border-none text-white'
    >
      <Trash2 size={14} />
    </button>
  );
}
