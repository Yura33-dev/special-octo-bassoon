import { ISlideMapped } from '@/types';

import BannersForm from './forms/BannersForm';

interface IBannersListProps {
  slides: ISlideMapped[];
}

export default function BannersList({ slides }: IBannersListProps) {
  return (
    <ul className='mt-10 flex flex-col gap-4'>
      {slides.length > 0 &&
        slides.map((slide, index) => (
          <li
            key={slide.id}
            className='flex flex-col items-stretch gap-6 bg-teal-700/20 rounded-md p-4'
          >
            <h2 className='text-2xl bold'>Баннер # {index + 1}</h2>
            <BannersForm banner={slide} />
          </li>
        ))}

      {slides.length === 0 && (
        <li>
          <h2 className='text-xl'>Список банерів порожній</h2>
        </li>
      )}
    </ul>
  );
}
