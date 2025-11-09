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
    values: string[];
  }) => void;
}

export default function Filters({
  filters,
  title,
  formik,
  onAddFilter,
  onDeleteFilter,
}: IFiltersProps) {
  const usedFilterIds = formik.values.filters.map(fil => fil.filter);
  const globalFiltered = filters.filter(fil => !usedFilterIds.includes(fil.id));

  return (
    <div className='col-span-full bg-gray-200/60 rounded-md p-4'>
      <h2 className='text-lg font-semibold md:mb-4'>{title}</h2>

      <AddElementButton title='фільтр' onClick={onAddFilter} />

      <ul className='grid gap-4 grid-cols-1 md:grid-cols-2  lg:grid-cols-3'>
        {formik.values.filters.map((filter, index) => {
          return (
            <li
              key={filter.id}
              className='p-3 bg-teal-700/20 rounded-md flex flex-col gap-2'
            >
              <div className='flex flex-col gap-2 basis-full'>
                <div className='min-h-[58px]'>
                  <Select
                    id={String(index)}
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
                            ? { ...fil, filter: newFilter.id, values: [] }
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
                    isMulti
                    name='filters'
                    placeholder='Оберіть значення фільтра'
                    options={
                      filters.find(fil => fil.id === filter.filter)?.variants ||
                      []
                    }
                    getOptionLabel={option =>
                      option.translatedData['uk'].variantTitle
                    }
                    getOptionValue={filterValue => filterValue.variantSlug}
                    //
                    defaultValue={null}
                    value={
                      filters
                        .find(f => f.id === filter.filter)
                        ?.variants.filter(variant =>
                          filter.values.includes(variant.variantSlug)
                        ) || []
                    }
                    onChange={value => {
                      if (!value) return;

                      formik.setFieldValue(
                        `filters`,

                        formik.values.filters.map(fil =>
                          fil.id === filter.id
                            ? {
                                ...fil,
                                values: value.map(
                                  selectedOption => selectedOption.variantSlug
                                ),
                              }
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
                  {typeof get(formik.errors, `filters[${index}].values`) ===
                  'string' ? (
                    <p className='mt-1 text-xs pl-2 text-red-600'>
                      {get(formik.errors, `filters[${index}].values`) as string}
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
          );
        })}
      </ul>
    </div>
  );
}
