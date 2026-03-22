'use client';

import { FormikHelpers, useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { createReview } from '@/lib/api';
import { reviewValidationSchema } from '@/lib/validations';
import { IReviewForm } from '@/types';

import StarRating from '../../shared/reviews/StarRating';

interface IReviewFormProps {
  productId: string;
}

const initialValues: IReviewForm = {
  productId: '',
  authorName: '',
  authorContact: '',
  rating: 0,
  comment: '',
  managerReview: '',
};

export default function ReviewForm({ productId }: IReviewFormProps) {
  const t = useTranslations('ProductPage');

  const handleSubmit = async (
    values: IReviewForm,
    { resetForm, setSubmitting, setFieldValue }: FormikHelpers<IReviewForm>
  ) => {
    try {
      await createReview(values);
      toast.success(t('ReviewForm.Success'));
      resetForm();
      setFieldValue('productId', productId);
    } catch (_: unknown) {
      toast.error(t('ReviewForm.Error'));
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik<IReviewForm>({
    initialValues: { ...initialValues, productId },
    validationSchema: reviewValidationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <h3 className='text-lg font-semibold mb-4'>{t('ReviewForm.Title')}</h3>

      <form onSubmit={formik.handleSubmit} className=''>
        <div className='grid grid-cols-2 gap-4'>
          <div className='bg-white p-4 rounded-md col-span-full sm:col-start-1 sm:col-end-2'>
            {/* Name */}
            <label className='flex-1 block text-sm font-medium text-gray-700 mb-1'>
              <h3 className='text-sm mb-1 text-gray-600'>
                {t('ReviewForm.Name')}
              </h3>

              <input
                type='text'
                name='authorName'
                value={formik.values.authorName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='border h-[30px] rounded-md pl-2 text-sm text-gray-500 w-full'
              />

              {formik.touched.authorName && formik.errors.authorName && (
                <p className='text-red-500 text-xs mt-1'>
                  {formik.errors.authorName}
                </p>
              )}
            </label>
          </div>

          <div className='bg-white p-4 rounded-md col-span-full sm:col-start-2 sm:col-end-3'>
            {/* Contact */}
            <label className='flex-1 block text-sm font-medium text-gray-700 mb-1'>
              <h3 className='text-sm mb-1 text-gray-600'>
                {t('ReviewForm.Contact')}
              </h3>

              <input
                type='text'
                name='authorContact'
                value={formik.values.authorContact}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='border h-[30px] rounded-md pl-2 text-sm text-gray-500 w-full'
              />

              {formik.touched.authorContact && formik.errors.authorContact && (
                <p className='text-red-500 text-xs mt-1'>
                  {formik.errors.authorContact}
                </p>
              )}
            </label>
          </div>

          <div className='bg-white p-4 rounded-md col-span-full sm:col-start-1 sm:col-end-2'>
            <label className='block text-sm font-medium text-gray-700'>
              <h3 className='text-sm mb-1 text-gray-600'>
                {t('ReviewForm.Comment')}
              </h3>

              <textarea
                name='comment'
                value={formik.values.comment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={4}
                className='border rounded-md p-2 text-sm text-gray-500 w-full'
              />
              {formik.touched.comment && formik.errors.comment && (
                <p className='text-red-500 text-xs mt-1'>
                  {formik.errors.comment}
                </p>
              )}
            </label>

            {/* Rating */}
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              <h3 className='text-sm mb-1 text-gray-600'>
                {t('ReviewForm.Rating')}
              </h3>

              <StarRating
                value={formik.values.rating}
                onChange={val => formik.setFieldValue('rating', val)}
              />

              {formik.touched.rating && formik.errors.rating && (
                <p className='text-red-500 text-xs mt-1'>
                  {formik.errors.rating}
                </p>
              )}
            </label>
          </div>

          <div className='bg-white p-4 rounded-md col-span-full sm:col-start-2 sm:col-end-3'>
            {/* Manager Review */}
            <label className='block text-sm font-medium text-gray-700'>
              <h3 className='text-sm mb-1 text-gray-600'>
                {t('ReviewForm.ManagerReview')}
              </h3>

              <textarea
                name='managerReview'
                value={formik.values.managerReview}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={4}
                className='border rounded-md p-2 text-sm text-gray-500 w-full'
              />
              {formik.touched.managerReview && formik.errors.managerReview && (
                <p className='text-red-500 text-xs mt-1'>
                  {formik.errors.managerReview}
                </p>
              )}
            </label>
          </div>
        </div>

        <button
          type='submit'
          disabled={formik.isSubmitting}
          className='btn bg-primary text-white hover:bg-primary-dark border-none min-w-[141px] w-full sm:w-auto block mt-6 mx-auto disabled:bg-gray-300'
        >
          {formik.isSubmitting ? (
            <span className='loading loading-spinner loading-sm' />
          ) : (
            t('ReviewForm.Submit')
          )}
        </button>
      </form>
    </div>
  );
}
