import { Rocket, ThumbsUp, TrendingDown } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function Benefits() {
  const t = await getTranslations('Benefits');

  return (
    <ul className='mt-20 flex flex-col gap-3 md:flex-row'>
      <li className='relative rounded-md shadow-md p-8 flex-auto basis-1/3 transition-all duration-150 hover:-translate-y-3 flex flex-col items-center'>
        <span className='bg-teal-700/20 w-24 h-24 rounded-full flex justify-center items-center'>
          <ThumbsUp className='w-14 h-14 stroke-primary-dark' />
        </span>
        <span className='inline-block text-2xl text-center font-medium mt-6'>
          {t('WideChoise')}
        </span>
      </li>

      <li className='relative rounded-md shadow-md p-8 flex-auto basis-1/3 transition-all duration-150 hover:-translate-y-3 flex flex-col items-center'>
        <span className='bg-teal-700/20 w-24 h-24 rounded-full flex justify-center items-center'>
          <Rocket className='w-14 h-14 stroke-primary-dark' />
        </span>
        <span className='inline-block text-2xl text-center font-medium mt-6'>
          {t('FastestDelivery')}
        </span>
      </li>

      <li className='relative rounded-md shadow-md p-8 flex-auto basis-1/3 transition-all duration-150 hover:-translate-y-3 flex flex-col items-center'>
        <span className='bg-teal-700/20 w-24 h-24 rounded-full flex justify-center items-center'>
          <TrendingDown className='w-14 h-14 stroke-primary-dark' />
        </span>
        <span className='inline-block text-2xl text-center font-medium mt-6'>
          {t('LowestPrices')}
        </span>
      </li>
    </ul>
  );
}
