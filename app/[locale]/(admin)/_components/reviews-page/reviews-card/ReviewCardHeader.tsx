'use client';

import { ExternalLink } from 'lucide-react';
import { useLocale } from 'next-intl';

import { Link } from '@/i18n/routing';
import { IReviewAdminMapped } from '@/types';

import Badge from '../../shared/Badge';

interface IReviewCardHeaderProps {
  authorName: string;
  authorContact: string;
  date: string;
  approved: boolean;
  product: IReviewAdminMapped['product'];
}

export default function ReviewCardHeader({
  authorName,
  authorContact,
  date,
  approved,
  product,
}: IReviewCardHeaderProps) {
  const locale = useLocale();

  const productHref = `/catalog/${product.mainCategorySlug[locale]}/${product.subCategorySlug[locale]}/${product.slug[locale]}`;

  return (
    <div className='flex items-start justify-between flex-wrap gap-2 sm:gap-4'>
      <div className='flex gap-1 items-center'>
        <span className='font-semibold text-gray-800'>{authorName}</span>
        <span className='text-sm text-gray-500'>({authorContact})</span>
      </div>

      <div className=''>
        <div className='flex gap-4 justify-between items-center mb-2'>
          <span className='text-xs text-gray-400 block text-right'>{date}</span>
          <Badge
            title={approved ? 'Схвалено' : 'Очікує'}
            style={approved ? 'green' : 'yellow'}
          />
        </div>

        <div className=''>
          <Link
            href={productHref}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-1 text-sm text-primary hover:underline w-fit'
          >
            <ExternalLink size={14} />
            {product.name[locale]}
          </Link>
        </div>
      </div>
    </div>
  );
}
