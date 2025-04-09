import { FormikProps } from 'formik';
import { SingleValue } from 'react-select';

import { IPackagingMapped, IProductForm } from '@/types';

import CustomCheckBox from '../../../shared/forms-elements/CustomCheckBox';
import Input from '../../../shared/forms-elements/Input';
import AddElementButton from '../elements/AddElementButton';
import DeleteElementButton from '../elements/DeleteElementButton';
import PackagingSelect from '../elements/PackagingSelect';

interface IPackagingProps {
  title: string;
  packaging: Array<IPackagingMapped>;
  onAddPackaging: () => void;
  onDeletePackaging: (value: number) => void;
  formik: FormikProps<IProductForm>;
}

export default function Packaging({
  title,
  packaging,
  onAddPackaging,
  onDeletePackaging,
  formik,
}: IPackagingProps) {
  const selectedPackIds = formik.values.packaging.items.map(
    pack => pack.packId
  );
  const filteredPackaging = packaging.filter(
    item => !selectedPackIds.includes(item.id)
  );

  return (
    <div className='col-span-full bg-gray-200/60 rounded-md p-4'>
      <h2 className='text-lg font-semibold mb-4'>{title}</h2>

      <AddElementButton title='пакування' onClick={onAddPackaging} />

      <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center flex-grow basis-full'>
        {formik.values.packaging.items.map((pack, index) => (
          <li key={index} className='p-4 bg-gray-300/50 rounded-md'>
            <div className='flex flex-col-reverse items-end md:flex-row md:items-start gap-4 mb-5'>
              <PackagingSelect
                className='min-h-[58px] w-full flex-grow basis-full'
                packaging={filteredPackaging}
                placeholder='Оберіть пакування...'
                name={`packaging.items[${index}].packId`}
                value={
                  packaging.find(
                    pack =>
                      pack.id === formik.values.packaging.items[index].packId
                  ) || null
                }
                onChange={(newValue: SingleValue<IPackagingMapped>) => {
                  if (!newValue) return;

                  formik.setFieldValue(
                    `packaging.items[${index}].packId`,
                    newValue.id
                  );
                }}
                touched={formik.touched}
                errors={formik.errors}
              />

              <DeleteElementButton
                title='пакування'
                onClick={() => onDeletePackaging(index)}
              />
            </div>

            <div className='mb-4 flex flex-col md:flex-row gap-2'>
              <Input
                title='Кількість на складі'
                name={`packaging.items.[${index}].quantity`}
                type='text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.packaging.items[index].quantity}
                touched={formik.touched}
                errors={formik.errors}
                className='sm:max-w-72'
                labelClassName='min-h-[72px] md:min-h-[80px] basis-1/2'
              />

              <Input
                title='Ціна'
                name={`packaging.items.[${index}].price`}
                type='text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.packaging.items[index].price}
                touched={formik.touched}
                errors={formik.errors}
                className='sm:max-w-72'
                labelClassName='min-h-[72px] md:min-h-[88px] basis-1/2'
              />
            </div>

            <div className='min-h-[68px]'>
              <CustomCheckBox
                title='Пакування за замовчуванням'
                falseTitle='Ні'
                trueTitle='Так'
                onClick={() =>
                  formik.values.packaging.default === null
                    ? formik.setFieldValue('packaging.default', pack.packId)
                    : formik.setFieldValue('packaging.default', null)
                }
                value={
                  !!formik.values.packaging.default &&
                  !!pack.packId &&
                  formik.values.packaging.default === pack.packId
                }
                disabled={
                  (!!formik.values.packaging.default &&
                    formik.values.packaging.default !== pack.packId) ||
                  !!!pack.packId
                }
              />

              {formik.errors.packaging?.default &&
                typeof formik.errors.packaging.default === 'string' && (
                  <p className='mt-1 text-xs text-red-600'>
                    {String(formik.errors.packaging.default)}
                  </p>
                )}
            </div>
          </li>
        ))}
      </ul>

      {formik.errors.packaging?.items &&
        typeof formik.errors.packaging.items === 'string' && (
          <p className='mt-1 text-xs text-red-600'>
            {formik.errors.packaging.items}
          </p>
        )}
    </div>
  );
}
