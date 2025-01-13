import { ArrowDownRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/routing';
import { ICategory } from '@/types';

interface IGridCategoriesProps {
  featuredCategories: Array<ICategory>;
}

export default async function GridFeaturedCategories({
  featuredCategories,
}: IGridCategoriesProps) {
  const t = await getTranslations('MainPage');

  return (
    <ul
      className='grid gap-2 auto-rows-[125px]
                  grid-cols-1
                  sm:grid-cols-[310px_repeat(auto-fill,_minmax(220px,_1fr))]
                  sm:auto-rows-[160px]
                  md:auto-rows-[190px]
                  lg:auto-rows-[220px]'
    >
      <li className='bg-white rounded-md shadow-md'>
        <Link
          href='/catalog'
          className='group flex flex-col gap-4 relative h-full p-6 pr-16 sm:pr-6'
        >
          <h3 className='text-2xl'>{t('CategoriesSectionOurProducts')}</h3>
          <span className='leading-tight text-base'>
            {t('CategoriesSectionToViewAllProducts')}
          </span>

          <ArrowDownRight
            className='w-14 h-14 absolute bottom-2 right-[10px] transition-all duration-150 stroke-primary opacity-70
                        md:group-hover:w-16 md:group-hover:h-16 md:group-hover:opacity-100'
          />
        </Link>
      </li>

      {featuredCategories.map(({ id, name, image, parentCategories, slug }) => {
        const link =
          parentCategories.length > 0
            ? parentCategories[0].slug + '/' + slug
            : '' + slug;

        return (
          <li
            key={id}
            style={{
              backgroundImage: `url(${image})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
            className='overflow-hidden relative rounded-md 
                    after:content-[""] after:absolute after:z-[2]  after:block after:w-full after:h-full 
                    after:duration-150 after:transition-colors after:bg-black/40 hover:after:bg-black/50'
          >
            <Link
              href={`/catalog/${link}`}
              className='group flex w-full h-full justify-center items-end 
                      text-2xl font-bold text-white uppercase p-2 
                      absolute z-[3]'
            >
              <h3
                className='relative text-xl font-medium mb-3
                        after:content-[""] after:block after:w-full after:max-w-0 after:h-[2px] after:bg-accent after:transition-all
                      after:duration-150 after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 
                     group-hover:after:max-w-full'
              >
                {name}
              </h3>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
