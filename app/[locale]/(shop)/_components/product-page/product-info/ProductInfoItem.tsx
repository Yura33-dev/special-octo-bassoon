interface IProductInfoItemProps {
  title: string;
  variants: string;
}

export default function ProductInfoItem({
  title,
  variants,
}: IProductInfoItemProps) {
  return (
    <li className='flex flex-col'>
      <span className='font-bold'>{title}:</span> <span>{variants}</span>
    </li>
  );
}
