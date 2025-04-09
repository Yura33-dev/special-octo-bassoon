import { FormikProps } from 'formik';

import { ICategoryMapped, IProductForm } from '@/types';

import CategoriesSelect from '../elements/CategoriesSelect';

interface ICategoriesProps {
  title: string;
  categories: Array<ICategoryMapped>;
  formik: FormikProps<IProductForm>;
}

export default function Categories({
  title,
  categories,
  formik,
}: ICategoriesProps) {
  const subcategories =
    categories.filter(
      category => category.id === formik.values.categories[0]
    )[0]?.childCategories || [];

  return (
    <div className='col-span-full bg-gray-200/60 rounded-md p-4'>
      <h2 className='text-lg font-semibold md:mb-4'>{title}</h2>

      <ul className='mt-4 flex flex-col sm:flex-row gap-2'>
        {[
          {
            label: 'Батьківська категорія',
            categories: categories.filter(cat => cat.main),
            index: 0,
          },
          {
            label: 'Дочірня категорія',
            categories: subcategories || [],
            index: 1,
          },
        ].map(({ label, categories, index }) => {
          const selectedCategory =
            categories.find(
              category => category.id === formik.values.categories[index]
            ) || null;

          return (
            <li key={index} className='min-h-[58px] basis-1/2'>
              <CategoriesSelect
                categories={categories}
                placeholder={label}
                name={`categories`}
                onChange={newValue =>
                  formik.setFieldValue(`categories[${index}]`, newValue?.id)
                }
                value={selectedCategory}
                touched={formik.touched}
                errors={formik.errors}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
