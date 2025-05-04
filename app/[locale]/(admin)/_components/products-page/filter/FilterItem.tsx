import clsx from 'clsx';
import { Check } from 'lucide-react';

interface IFilterListProps {
  filter: {
    slug: string;
    title: string;
    variants: Array<{ slug: string; title: string }>;
  };
  checkedValues: { [key: string]: Set<string> };
  handleCheckboxChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    slug: string,
    variantSlug: string
  ) => void;
}

export default function FilterItem({
  filter,
  checkedValues,
  handleCheckboxChange,
}: IFilterListProps) {
  return (
    <li
      className={clsx(
        'flex flex-col gap-4 mb-4 border-b-[1px] pb-4 border-gray-300 last:border-none',
        'lg:block'
      )}
    >
      <h3 className='font-semibold text-lg lg:mb-2'>{filter.title}</h3>

      <ul className='max-h-[200px] overflow-y-auto'>
        {filter.variants.map(({ slug: variantSlug, title: variantTitle }) => (
          <li key={variantSlug}>
            <label className='group flex items-start gap-2 cursor-pointer relative'>
              <input
                type='checkbox'
                checked={checkedValues[filter.slug]?.has(variantSlug) || false}
                onChange={e =>
                  handleCheckboxChange(e, filter.slug, variantSlug)
                }
                className='hidden'
              />

              <div
                className='w-4 h-4 flex items-center justify-center shrink-0 border-2 border-gray-400 rounded-[4px] transition
                          group-has-[input:checked]:bg-primary group-has-[input:checked]:border-primary relative'
              >
                <Check
                  strokeWidth={3}
                  className='w-3 h-3 text-white opacity-0 group-has-[input:checked]:opacity-100 absolute top-0 left-0 transition-opacity'
                />
              </div>
              <span className='text-sm text-gray-800'>{variantTitle}</span>
            </label>
          </li>
        ))}
      </ul>
    </li>
  );
}
