interface IManagerReviewProps {
  text: string;
}

export default function ManagerReview({ text }: IManagerReviewProps) {
  return (
    <div className='pt-2 border-t border-gray-100'>
      <p className='text-xs font-semibold text-gray-500 mb-1'>Про менеджера</p>
      <p className='text-sm text-gray-700'>{text}</p>
    </div>
  );
}
