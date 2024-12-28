import Image from 'next/image';

import { Link } from '@/i18n/routing';

import CardLabel from './CardLabel';

interface ICardImageProps {
  productLink: string;
  productImage: string;
  productName: string;
  productLabels: Array<string>;
}

export default function CardImage({
  productLink,
  productImage,
  productName,
  productLabels,
}: ICardImageProps) {
  return (
    <Link href={productLink} className='group'>
      <div className='relative h-[200px] rounded-md overflow-hidden'>
        <Image
          src={productImage}
          alt={productName}
          width={400}
          height={400}
          className='w-full h-full object-cover rounded-md'
        />
        {productLabels && <CardLabel labels={productLabels} />}
      </div>
    </Link>
  );
}
