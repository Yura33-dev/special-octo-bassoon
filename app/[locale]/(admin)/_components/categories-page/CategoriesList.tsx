import { getLocale } from 'next-intl/server';

import Container from '@/components/shared/Container';
import ModalWindow from '@/components/shared/modals/ModalWindow';
import { getAllCategories } from '@/lib/api';
import { ADD_CATEGORY_ID } from '@/lib/constants';
import { locale } from '@/types';

import HeaderBody from './table/HeaderBody';
import AddButton from '../shared/AddButton';
import CategoryAddModal from './modals/CategoryAddModal';
import HeaderTable from './table/HeaderTable';
import Table from './table/Table';

export default async function CategoriesList() {
  const locale = (await getLocale()) as locale;

  const categories = await getAllCategories(locale);
  const mainCategories = categories.filter(category => category.main);
  const subCategories = categories.filter(category => !category.main);

  return (
    <>
      <section>
        <Container>
          <div className='flex items-center justify-between gap-8'>
            <h1 className='text-2xl font-semibold'>
              Категорії ({mainCategories.length})
            </h1>
            {mainCategories.length <= 0 && subCategories.length <= 0 ? null : (
              <AddButton modalId={ADD_CATEGORY_ID} />
            )}
          </div>

          {mainCategories.length <= 0 ? (
            <div>
              <h3>Створіть першу категорію для товарів</h3>
              <AddButton
                modalId={ADD_CATEGORY_ID}
                className='mt-4'
                title='Створити'
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

          <ModalWindow
            title='Додати категорію'
            modalId={ADD_CATEGORY_ID}
            className='lg:max-w-[1000px]'
          >
            <CategoryAddModal />
          </ModalWindow>
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
