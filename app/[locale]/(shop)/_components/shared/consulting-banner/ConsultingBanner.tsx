'use client';

import { useTranslations } from 'next-intl';

import Container from '@/components/shared/Container';

export default function ConsultingBanner() {
  const t = useTranslations('Consulting');

  return (
    <Container className='mt-20'>
      <div className='bg-gradient-to-r from-primary-dark to-primary p-4 sm:p-8 rounded-xl flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center shadow-md'>
        <div className='sm:mr-3'>
          <span className='text-2xl text-white font-semibold inline-block mb-4 sm:mb-2'>
            {t('Title')}
          </span>
          <p className='text-base text-white'>{t('Purpose')}</p>
        </div>
        <button
          type='button'
          className='btn bg-accent border-none transition-all duration-150 hover:bg-accent hover:text-white'
        >
          {t('BtnTitle')}
        </button>
      </div>
    </Container>
  );
}
