'use client';

import { FormikProps } from 'formik';
import { CircleCheckBig } from 'lucide-react';

import { IProductForm } from '@/types';

interface ILabelsProps {
  title: string;
  formik: FormikProps<IProductForm>;
}

export default function Labels({ title, formik }: ILabelsProps) {
  const handleAddLabel = (label: string) => {
    if (formik.values.labels.includes(label)) {
      formik.setFieldValue('labels', [
        ...formik.values.labels.filter(item => item !== label),
      ]);
    } else {
      formik.setFieldValue('labels', [...formik.values.labels, label]);
    }
  };

  return (
    <div className='col-span-full bg-gray-200/60 rounded-md p-4'>
      <h2 className='text-lg font-semibold md:mb-4'>{title}</h2>

      <div className=' flex justify-start items-center gap-6'>
        {[
          { title: 'Лейбл ТОП', label: 'top' },
          // { title: 'Лейбл Розпродаж', label: 'sale' },
        ].map(btn => (
          <button
            key={btn.label}
            type='button'
            className='bg-primary text-white px-4 py-2 rounded-md flex items-center gap-4 transition-all hover:bg-primary-dark'
            onClick={() => handleAddLabel(btn.label)}
          >
            {btn.title}
            {formik.values.labels.includes(btn.label) && (
              <CircleCheckBig className='w-5 h-5' />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
