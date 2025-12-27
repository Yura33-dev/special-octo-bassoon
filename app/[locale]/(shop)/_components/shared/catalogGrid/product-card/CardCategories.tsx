import { Link } from '@/i18n/routing';

interface ICardCategoriesProps {
  mainCategory: { link: string; name: string | undefined };
  subCategory: { link: string; name: string | undefined };
}

export default function CardCategories({
  mainCategory,
  subCategory,
}: ICardCategoriesProps) {
  return (
    <div className='card-actions justify-end'>
      <div className='rounded-badge px-2 leading-normal bg-orange-300 text-foreground text-xs border-none'>
        <Link href={mainCategory.link}>{mainCategory.name}</Link>
      </div>
      <div className='rounded-badge px-2 leading-normal bg-orange-300 text-foreground text-xs border-none'>
        <Link href={subCategory.link}>{subCategory.name}</Link>
      </div>
    </div>
  );
}
