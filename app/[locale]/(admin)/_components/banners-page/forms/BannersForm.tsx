'use client';

import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/routing';
import { createSlide, imageUploader, patchSlideById } from '@/lib/api';
import { ADD_BANNER_ID, DELETE_BANNER_ID } from '@/lib/constants';
import { bannerValidationSchema } from '@/lib/validations';
import { useModalStore } from '@/providers';
import { ISlideForm, ISlideMapped } from '@/types';

import Localization from './blocks/Localization';
import DeleteButton from '../../shared/forms-elements/DeleteButton';
import SubmitButton from '../../shared/forms-elements/SubmitButton';
import BannerDeleteModal from '../modals/BannerDeleteModal';

interface IBannersFormProps {
  banner?: ISlideMapped;
  isAddForm?: boolean;
}

export default function BannersForm({
  banner,
  isAddForm = false,
}: IBannersFormProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const openModal = useModalStore(state => state.openModal);
  const closeModal = useModalStore(state => state.closeModal);
  const router = useRouter();

  const initialValues: ISlideForm = {
    translatedData: {
      uk: {
        linkTo: banner?.translatedData['uk'].linkTo ?? '',
        image: banner?.translatedData['uk'].image ?? '',
        name: banner?.translatedData['uk'].name ?? '',
        sortOrder: banner?.translatedData['uk'].sortOrder ?? 0,
        visible: banner?.translatedData['uk'].visible ?? true,
      },
      ru: {
        linkTo: banner?.translatedData['ru'].linkTo ?? '',
        image: banner?.translatedData['ru'].image ?? '',
        name: banner?.translatedData['ru'].name ?? '',
        sortOrder: banner?.translatedData['ru'].sortOrder ?? 0,
        visible: banner?.translatedData['ru'].visible ?? true,
      },
    },
  };

  const onSubmit = async (values: ISlideForm) => {
    setIsSubmitting(true);

    const [urlUkBanner, urlRuBanner] = await Promise.all([
      imageUploader({
        image: values.translatedData['uk'].image,
        folder: 'banners',
        locale: 'uk',
      }),
      imageUploader({
        image: values.translatedData['ru'].image,
        folder: 'banners',
        locale: 'ru',
      }),
    ]);

    values.translatedData['uk'].image = urlUkBanner ?? '/no-image.webp';
    values.translatedData['ru'].image = urlRuBanner ?? '/no-image.webp';

    try {
      if (isAddForm) {
        await createSlide(values);
        closeModal(ADD_BANNER_ID);
        setTimeout(() => router.back(), 210);
      } else if (!isAddForm && banner) {
        await patchSlideById(banner.id, values);
      }
      toast.success(`Банер успішно ${isAddForm ? 'створено' : 'оновлено'}!`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          `Сталася помилка при ${isAddForm ? 'створені' : 'оновленні'} баннеру`
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteButton = () => {
    openModal(DELETE_BANNER_ID);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: bannerValidationSchema,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className='grid gap-6 grid-cols-1 xl:grid-cols-2'>
          <Localization
            title='Українська локалізація'
            slide={banner}
            locale='uk'
            formik={formik}
            isAddForm={isAddForm}
          />

          <Localization
            title='Російська локалізація'
            slide={banner}
            locale='ru'
            formik={formik}
            isAddForm={isAddForm}
          />
        </div>

        <div className='flex gap-4 items-center justify-center mt-6'>
          <SubmitButton
            title='Зберегти'
            isSubmitting={isSubmitting}
            className='px-4 py-2'
          />
          {!isAddForm && (
            <>
              <p className='block text-center text-sm uppercase'>Або</p>

              <DeleteButton
                onClick={handleDeleteButton}
                isSubmitting={isSubmitting}
                withoutSpinner
              />
            </>
          )}
        </div>
      </form>

      {banner && !isAddForm && (
        <BannerDeleteModal
          bannerId={banner.id}
          bannerTitle={banner.translatedData['uk'].name}
        />
      )}
    </>
  );
}
