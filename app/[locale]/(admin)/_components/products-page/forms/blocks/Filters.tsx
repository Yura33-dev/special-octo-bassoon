import { FormikProps } from 'formik';
import { get } from 'lodash';
import Select from 'react-select';

import { IFilterMapped, IProductForm } from '@/types';

import AddElementButton from '../elements/AddElementButton';
import DeleteElementButton from '../elements/DeleteElementButton';

interface IFiltersProps {
  filters: Array<IFilterMapped>;
  title: string;
  formik: FormikProps<IProductForm>;
  onAddFilter: () => void;
  onDeleteFilter: (value: {
    id: string;
    filter: string;
    value: string;
  }) => void;
  handleSelectProducer: (value: string) => void;
}

export default function Filters({
  filters,
  title,
  formik,
  onAddFilter,
  onDeleteFilter,
  handleSelectProducer,
}: IFiltersProps) {
  const usedFilterIds = formik.values.filters.map(fil => fil.filter);
  const globalFiltered = filters.filter(fil => !usedFilterIds.includes(fil.id));

  return (
    <div className='col-span-full bg-gray-200/60 rounded-md p-4'>
      <h2 className='text-lg font-semibold md:mb-4'>{title}</h2>

      <AddElementButton title='фільтр' onClick={onAddFilter} />

      {typeof get(formik.errors, `producer`) === 'string' ? (
        <p className='mb-2 text-xs pl-2 text-red-600'>
          {get(formik.errors, `producer`) as string}
        </p>
      ) : null}

      <ul className='grid gap-4 grid-cols-1 md:grid-cols-2  lg:grid-cols-3'>
        {formik.values.filters.map((filter, index) => (
          <li
            key={filter.id}
            className='p-3 bg-teal-700/20 rounded-md flex flex-col gap-2'
          >
            <div className='flex flex-col gap-2 basis-full'>
              <div className='min-h-[58px]'>
                <Select
                  id={filter.id}
                  name='filters'
                  placeholder='Оберіть фільтр'
                  options={globalFiltered}
                  value={filters.find(fil => fil.id === filter.filter)}
                  getOptionLabel={fil => fil.translatedData['uk'].filterTitle}
                  getOptionValue={filter => filter.id}
                  onChange={newFilter => {
                    if (!newFilter) return;

                    formik.setFieldValue(
                      `filters`,

                      formik.values.filters.map(fil =>
                        fil.id === filter.id
                          ? { ...fil, filter: newFilter.id, value: null }
                          : fil
                      )
                    );
                  }}
                  classNames={{
                    container: ({ isFocused }) =>
                      isFocused ? '!cursor-pointer' : '',
                    option: ({ isSelected, isFocused }) =>
                      isSelected
                        ? '!bg-primary !text-white'
                        : isFocused
                          ? '!bg-teal-700 !cursor-pointer !text-white'
                          : '!bg-white !text-black',
                    control: ({ isFocused }) =>
                      isFocused
                        ? '!border-none !ring-offset-0 !ring-2 !ring-primary'
                        : '!border-none !ring-offset-0 !ring-1 !ring-primary !cursor-pointer',
                    placeholder: () => '!text-sm',
                  }}
                />
                {typeof get(formik.errors, `filters[${index}].filter`) ===
                'string' ? (
                  <p className='mt-1 text-xs pl-2 text-red-600'>
                    {get(formik.errors, `filters[${index}].filter`) as string}
                  </p>
                ) : null}
              </div>

              <div className='min-h-[58px]'>
                <Select
                  name='filters'
                  placeholder='Оберіть значення фільтра'
                  options={
                    filters.find(fil => fil.id === filter.filter)?.variants ||
                    []
                  }
                  defaultValue={null}
                  value={filters
                    .find(f => f.id === filter.filter)
                    ?.variants.find(
                      variant => variant.variantSlug === filter.value
                    )}
                  getOptionLabel={filterValue =>
                    filterValue.translatedData['uk'].variantTitle
                  }
                  getOptionValue={filterValue => filterValue.variantSlug}
                  onChange={value => {
                    if (!value) return;

                    formik.setFieldValue(
                      `filters`,

                      formik.values.filters.map(fil =>
                        fil.id === filter.id
                          ? { ...fil, value: value.variantSlug }
                          : fil
                      )
                    );

                    handleSelectProducer(value.variantSlug);
                  }}
                  classNames={{
                    container: ({ isFocused }) =>
                      isFocused ? '!cursor-pointer' : '',
                    option: ({ isSelected, isFocused }) =>
                      isSelected
                        ? '!bg-primary !text-white'
                        : isFocused
                          ? '!bg-teal-700 !cursor-pointer !text-white'
                          : '!bg-white !text-black',
                    control: ({ isFocused }) =>
                      isFocused
                        ? '!border-none !ring-offset-0 !ring-2 !ring-primary'
                        : '!border-none !ring-offset-0 !ring-1 !ring-primary !cursor-pointer',
                    placeholder: () => '!text-sm',
                  }}
                />
                {typeof get(formik.errors, `filters[${index}].value`) ===
                'string' ? (
                  <p className='mt-1 text-xs pl-2 text-red-600'>
                    {get(formik.errors, `filters[${index}].value`) as string}
                  </p>
                ) : null}
              </div>
            </div>

            <DeleteElementButton
              title='фільтр'
              onClick={() => onDeleteFilter(filter)}
              className='self-center'
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
