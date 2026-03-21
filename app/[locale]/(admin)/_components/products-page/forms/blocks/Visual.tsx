import { FormikProps } from 'formik';

import { MAX_IMAGES_FOR_PRODUCT } from '@/lib/constants';
import { IProductForm } from '@/types';

import CustomCheckBox from '../../../shared/forms-elements/CustomCheckBox';
import FileUploader from '../../../shared/forms-elements/FileUploader';

interface IVisualProps {
  title: string;
  formik: FormikProps<IProductForm>;
  productImages: string[];
}

export default function Visual({ title, formik, productImages }: IVisualProps) {
  const handleImageChange = (index: number, file: File | null) => {
    const newImages = [...formik.values.images];
    if (file) {
      newImages[index] = file;
    } else {
      newImages.splice(index, 1);
    }
    formik.setFieldValue('images', newImages);
  };

  return (
    <div className='col-span-full bg-gray-200/60 rounded-md p-4'>
      <h2 className='text-lg font-semibold md:mb-4'>{title}</h2>

      <div className='flex flex-wrap gap-6 justify-between'>
        <div className='flex flex-wrap gap-4'>
          {Array.from({ length: MAX_IMAGES_FOR_PRODUCT }).map((_, index) => {
            const currentValue = formik.values.images[index];
            const imageUrl =
              typeof currentValue === 'string'
                ? currentValue
                : (productImages[index] ?? null);

            return (
              <FileUploader<IProductForm>
                key={index}
                name={`images[${index}]`}
                imageUrl={imageUrl}
                onChange={file => handleImageChange(index, file)}
                touched={formik.touched}
                errors={formik.errors}
              />
            );
          })}
        </div>

        <CustomCheckBox
          title='Відображати товар на сайті'
          falseTitle='Ні'
          trueTitle='Так'
          onClick={() =>
            formik.setFieldValue('visible', !formik.values.visible)
          }
          value={formik.values.visible}
        />
      </div>
    </div>
  );
}
