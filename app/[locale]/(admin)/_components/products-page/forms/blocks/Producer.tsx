import { FormikProps } from 'formik';
import { get } from 'lodash';
import Select from 'react-select';

import { IProducerMapped, IProductForm } from '@/types';

interface IProducerProps {
  title: string;
  producers: IProducerMapped[];
  formik: FormikProps<IProductForm>;
}

export default function Producer({ title, producers, formik }: IProducerProps) {
  return (
    <div className='col-span-full bg-gray-200/60 rounded-md p-4'>
      <h2 className='text-lg font-semibold md:mb-4'>{title}</h2>

      <Select
        id={'vyrobnik-tovaru'}
        name='producer'
        placeholder='Оберіть виробника'
        options={producers}
        defaultValue={producers.find(
          prod => prod.id === formik.values.producer
        )}
        getOptionLabel={producer => producer.translatedData['uk'].title}
        getOptionValue={producer => producer.id}
        onChange={newValue =>
          formik.setFieldValue(`producer`, newValue?.id ?? null)
        }
        classNames={{
          container: ({ isFocused }) => (isFocused ? '!cursor-pointer' : ''),
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

      {typeof get(formik.errors, `producer`) === 'string' ? (
        <p className='mt-2 text-xs pl-2 text-red-600'>
          {get(formik.errors, `producer`) as string}
        </p>
      ) : null}
    </div>
  );
}
