import Image from 'next/image';

interface IProductImageProps {
  src: string;
  alt: string;
}

export default function ProductImage({ src, alt }: IProductImageProps) {
  return (
    <div className='basis-1/2 '>
      <Image
        className='rounded-md mx-auto'
        src={src}
        width={600}
        height={500}
        alt={alt}
      />
    </div>
  );
}
