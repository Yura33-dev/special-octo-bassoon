import Image from 'next/image';

interface IProductImageProps {
  src: string;
  alt: string;
}

export default function ProductImage({ src, alt }: IProductImageProps) {
  return (
    <div className='basis-1/2 lg:basis-1/3 flex justify-center items-center sm:justify-start'>
      <div className='max-w-[300px] sm:max-w-[400px]'>
        <Image
          className='w-full h-full object-cover rounded-md'
          src={src}
          width={600}
          height={500}
          alt={alt}
        />
      </div>
    </div>
  );
}
