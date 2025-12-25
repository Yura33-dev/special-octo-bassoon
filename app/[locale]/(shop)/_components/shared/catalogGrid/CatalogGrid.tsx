import { Link } from '@/i18n/routing';
import { getPageDataByName } from '@/lib/api';
import { ICategoryMapped, locale } from '@/types';

interface ICatalogProps {
  categories:
    | Array<ICategoryMapped>
    | ICategoryMapped['childCategories'][number][];
  parentSlug?: string | null;
  locale: locale;
}

export default async function CatalogGrid({
  categories,
  parentSlug = null,
  locale,
}: ICatalogProps) {
  const salesPageData = await getPageDataByName('SalesPage');

  return (
    <ul
      className='grid gap-2 auto-rows-[140px]
              grid-cols-1
              sm:grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]
              sm:auto-rows-[190px]
              lg:gap-4
              lg:auto-rows-[250px]'
    >
      {categories.map(({ id, name, image, slug }) => {
        const generateLink = !parentSlug
          ? `catalog/${slug[locale]}`
          : `/catalog/${parentSlug}/${slug[locale]}`;

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
              href={generateLink}
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
                {name[locale]}
              </h3>
            </Link>
          </li>
        );
      })}
      {salesPageData && (
        <li
          style={{
            backgroundImage: `url(${salesPageData.translatedData[locale].meta.image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          className='overflow-hidden relative rounded-md 
                    after:content-[""] after:absolute after:z-[2]  after:block after:w-full after:h-full 
                    after:duration-150 after:transition-colors after:bg-black/40 hover:after:bg-black/50'
        >
          <Link
            href={'catalog/sales'}
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
              {salesPageData.translatedData[locale].h1}
            </h3>
          </Link>
        </li>
      )}
    </ul>
  );
}
