import { FormikProps } from 'formik';

import { IProductForm } from '@/types';

import CustomCheckBox from '../../../shared/forms-elements/CustomCheckBox';
import FileUploader from '../../../shared/forms-elements/FileUploader';

interface IVisualProps {
  title: string;
  formik: FormikProps<IProductForm>;
}

export default function Visual({ title, formik }: IVisualProps) {
  return (
    <div className='col-span-full bg-gray-200/60 rounded-md p-4'>
      <h2 className='text-lg font-semibold md:mb-4'>{title}</h2>

      <div className='flex gap-8'>
        <FileUploader<IProductForm>
          name='imgUrl'
          imageUrl={
            typeof formik.values.imgUrl === 'string'
              ? formik.values.imgUrl
              : null
          }
          onChange={file => formik.setFieldValue('imgUrl', file)}
          touched={formik.touched}
          errors={formik.errors}
        />

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
