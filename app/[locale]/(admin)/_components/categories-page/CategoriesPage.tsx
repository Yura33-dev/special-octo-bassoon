import Container from '@/components/shared/Container';
import { getAllCategories } from '@/lib/api';
import { ADD_CATEGORY_ID } from '@/lib/constants';

import HeaderBody from './table/HeaderBody';
import AddButton from '../shared/AddButton';
import HeaderTable from './table/HeaderTable';
import Table from './table/Table';
import PageMainHeader from '../shared/page-elements/PageMainHeader';

export default async function CategoriesPage() {
  const categories = await getAllCategories();
  const mainCategories = categories.filter(category => category.main);
  const subCategories = categories.filter(category => !category.main);

  return (
    <>
      <section>
        <Container>
          <div className='flex items-center justify-between gap-8'>
            <PageMainHeader title='Категорії' length={mainCategories.length} />

            {mainCategories.length <= 0 && subCategories.length <= 0 ? null : (
              <AddButton
                modalId={ADD_CATEGORY_ID}
                type='link'
                href='/dashboard/categories/new'
              />
            )}
          </div>

          {mainCategories.length <= 0 ? (
            <div>
              <h3>Створіть першу категорію для товарів</h3>
              <AddButton
                modalId={ADD_CATEGORY_ID}
                className='mt-4'
                title='Створити'
                type='link'
                href='/dashboard/categories/new'
              />
            </div>
          ) : (
            <Table>
              <HeaderTable
                classNamePhotoCell='flex-shrink-0 flex-grow-0 basis-[70px]'
                classNameRegularCell='flex justify-center'
                titles={['Назва', 'Активність', 'Підкатегорій', 'Дія']}
              />
              <HeaderBody categories={mainCategories} />
            </Table>
          )}
        </Container>
      </section>

      <section>
        <Container>
          <div className='mt-10 flex items-center justify-between gap-8'>
            <h2 className='text-2xl font-semibold'>
              Підкатегорії ({subCategories.length})
            </h2>
          </div>

          {subCategories.length <= 0 ? (
            <div>
              <h3>Створіть першу дочірню категорію для товарів</h3>
              <AddButton
                modalId={ADD_CATEGORY_ID}
                className='mt-4'
                title='Створити'
                type='link'
                href='/dashboard/categories/new'
              />
            </div>
          ) : (
            <Table>
              <HeaderTable
                classNamePhotoCell='flex-shrink-0 flex-grow-0 basis-[70px]'
                classNameRegularCell='flex justify-center'
                classNameRow='bg-background sticky top-16'
                titles={['Назва', 'Активність', 'Батьківська категорія', 'Дія']}
              />

              <HeaderBody categories={subCategories} />
            </Table>
          )}
        </Container>
      </section>
    </>
  );
}
