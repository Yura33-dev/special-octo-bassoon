import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

import { useCartStore } from '@/providers/cart.provider';

interface INewProductSlideProps {
  product: {
    id: string;
    imgUrl: string;
    title: string;
    pack: string;
    possibility: string;
    category: string;
    parentCategory: string;
    price: number;
  };
}

export default function NewProductSlide({ product }: INewProductSlideProps) {
  const addToCart = useCartStore(state => state.addProduct);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      imgUrl: product.imgUrl,
      pack: product.pack,
    });

    toast.success(`Товар ${product.title} успішно доданий в кошик`);
  };

  return (
    <>
      <Link href='#' className='group'>
        <div className='relative h-[200px] rounded-md overflow-hidden'>
          <Image
            src={product.imgUrl}
            alt={product.title}
            width={500}
            height={500}
            className='w-full h-full object-cover rounded-md'
          />
          <span
            className='badge h-auto w-auto px-2 py-1 rounded-md bg-accent border-none text-white text-base font-semibold absolute top-4 right-4
                              transition-colors duration-150 group-hover:bg-primary'
          >
            NEW
          </span>
        </div>
      </Link>
      <div className='card-body gap-0 p-4 '>
        <h3 className='text-xl font-semibold text-center mb-3 max-w-full truncate'>
          {product.title}
        </h3>

        <p className='font-bold text-center text-xl mb-2'>{product.price}</p>

        <span className='badge border-none bg-primary text-white text-xs mb-3 block mx-auto leading-relaxed'>
          {product.possibility}
        </span>
        <p className='text-center text-sm mb-3'>Оптом і в роздріб</p>

        <button
          className='btn bg-accent border-none text-foreground mb-5 hover:bg-primary hover:text-white uppercase text-base'
          onClick={handleAddToCart}
        >
          В кошик
        </button>

        <div className='card-actions justify-end'>
          <div className='rounded-badge px-2 leading-normal bg-orange-300 text-foreground text-xs border-none'>
            <Link href='#'>{product.parentCategory}</Link>
          </div>
          <div className='rounded-badge px-2 leading-normal bg-orange-300 text-foreground text-xs border-none'>
            <Link href='#'>{product.category}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
