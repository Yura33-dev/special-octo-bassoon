'use client';

import { FormikHelpers, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import ShortUniqueId from 'short-unique-id';
import { toast } from 'sonner';

import RadioInput from '@/components/shared/inputs/RadioInput';
import { createOrder, patchOrderById } from '@/lib/api';
import {
  ADD_PRODUCTS_IN_ORDER,
  ARCHIVE_ORDER_ID,
  DELETE_ORDER_ID,
} from '@/lib/constants';
import { formattedPrice } from '@/lib/utils';
import { orderSchema } from '@/lib/validations';
import { useAdminStore, useModalStore } from '@/providers';
import { IOrderForm, IOrderMapped, IProductInOrderMapped } from '@/types';

import AddElementButton from '../../products-page/forms/elements/AddElementButton';
import DeleteButton from '../../shared/forms-elements/DeleteButton';
import Input from '../../shared/forms-elements/Input';
import SubmitButton from '../../shared/forms-elements/SubmitButton';
import AddProductsModal from '../modals/AddProductsModal';
import OrderProducts from '../order-parts/OrderProducts';
import { orderStatuses } from '../orderData';

interface IOrderFormProps {
  isAddForm?: boolean;
  order?: IOrderMapped;
}

export default function OrderForm({
  isAddForm = false,
  order,
}: IOrderFormProps) {
  const [orderId, setOrderId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const openModal = useModalStore(store => store.openModal);

  const productsFromStore = useAdminStore(store => store.productsInOrder);
  const setProductsToOrder = useAdminStore(store => store.setProductsToOrder);
  const removeProduct = useAdminStore(store => store.removeProductFromOrder);
  const totalOrderPrice = useAdminStore(store => store.totalOrderPrice);
  const resetProducts = useAdminStore(store => store.resetProducts);

  useEffect(() => {
    if (order && order.products) {
      setProductsToOrder(order.products);
    }

    return () => {
      resetProducts();
    };
  }, [order, setProductsToOrder, resetProducts]);

  useEffect(() => {
    if (!order?.orderNumber) {
      const uid = new ShortUniqueId({
        length: 6,
        dictionary: 'alphanum_upper',
      });
      setOrderId(`INV-${uid.rnd()}`);
    }
  }, [order?.orderNumber]);

  const initialValues: IOrderForm = {
    phone: order?.phone ?? '',
    name: order?.name ?? '',
    email: order?.email,
    deliveryBy: order?.deliveryBy ?? 'np',
    deliveryTo: order?.deliveryTo ?? '',
    paymentType: order?.paymentType ?? 'bank',
    orderNumber: order?.orderNumber ?? orderId,
    products: order?.products ?? [],
    postNumber: order?.postNumber ?? '',
    postCode: order?.postCode ?? '',
    surname: order?.surname ?? '',
    fatherName: order?.fatherName ?? '',
    status: order?.status ?? 'new',
    isArchive: order?.isArchive ?? false,
    createdAt: order?.createdAt ?? '',
  };

  const onSubmit = async (
    values: IOrderForm,
    helpers: FormikHelpers<IOrderForm>
  ) => {
    setIsSubmitting(true);

    const orderToSave: IOrderForm = {
      ...values,
      products: productsFromStore.map(
        pr =>
          ({
            productId: pr.productId.id,
            packId: pr.packId.id,
            price: pr.price,
            quantity: pr.quantity,
          }) as unknown as IProductInOrderMapped
      ),
      totalPrice: totalOrderPrice,
    };

    try {
      if (isAddForm) {
        await createOrder(orderToSave);
        helpers.resetForm();
        resetProducts();
      } else if (!isAddForm && order) {
        await patchOrderById(order.id, orderToSave);
      }
      toast.success(
        `Замовлення успішно ${isAddForm ? 'створено' : 'оновлено'}`
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          `Сталася помилка при ${isAddForm ? 'створені' : 'оновленні'} замовлення`
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddProductToCart = () => {
    openModal(ADD_PRODUCTS_IN_ORDER);
  };

  const handleDeleteProductFromCart = (productId: string, packId: string) => {
    removeProduct(productId, packId);
  };

  const handleDeleteButton = () => {
    openModal(DELETE_ORDER_ID);
  };

  const handleArchiveButton = () => {
    openModal(ARCHIVE_ORDER_ID);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: orderSchema,
    enableReinitialize: isAddForm ? true : false,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='grid grid-cols-2 gap-4 md:content-start'
    >
      <div className='bg-teal-700/10 p-4 rounded-md col-span-full sm:min-h-[150px]'>
        <h2 className='text-lg mb-4'>Інформація щодо замовлення</h2>

        <div className='flex flex-col md:flex-row gap-4 justify-start md:justify-between items-start md:items-center'>
          <p className='text-sm'>Номер: {formik.values.orderNumber}</p>

          <div className='text-sm w-full flex gap-2 items-center md:basis-52'>
            Статус:
            <Select<{ value: string; label: string }, false>
              placeholder='Оберіть статус товару'
              name='status'
              value={{
                value: formik.values.status,
                label: orderStatuses[formik.values.status],
              }}
              options={[
                { value: 'new', label: orderStatuses['new'] },
                { value: 'processing', label: orderStatuses['processing'] },
                { value: 'delivery', label: orderStatuses['delivery'] },
                { value: 'done', label: orderStatuses['done'] },
                { value: 'canceled', label: orderStatuses['canceled'] },
              ]}
              getOptionLabel={status => status.label}
              onChange={option => formik.setFieldValue('status', option?.value)}
              classNames={{
                container: ({ isFocused }) =>
                  isFocused
                    ? '!cursor-pointer basis-44 md:basis-full md:flex-grow'
                    : 'basis-44 md:basis-full md:flex-grow',
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
          </div>

          <div className='text-sm'>
            Дата: {new Date().toLocaleDateString('uk-UA')}
          </div>
        </div>
      </div>

      <div className='bg-teal-700/10 p-4 rounded-md col-span-full sm:min-h-[150px] sm:col-start-1 sm:col-end-2'>
        <h2 className='text-lg mb-4'>Спосіб доставки</h2>

        <div className='flex flex-col'>
          <RadioInput
            option={{
              title: 'Укрпошта',
              value: 'ukr',
              name: 'delivery',
              selected: formik.values.deliveryBy,
              setSelected: () => formik.setFieldValue('deliveryBy', 'ukr'),
            }}
          />
          <RadioInput
            option={{
              title: 'Нова пошта',
              value: 'np',
              name: 'delivery',
              selected: formik.values.deliveryBy,
              setSelected: () => formik.setFieldValue('deliveryBy', 'np'),
            }}
          />
        </div>
      </div>

      <div className='bg-teal-700/10 p-4 rounded-md col-span-full sm:min-h-[150px] sm:col-start-2 sm:col-end-3'>
        <h2 className='text-lg mb-4'>Спосіб оплати</h2>

        <RadioInput
          option={{
            title: 'Банківський переказ',
            value: 'bank',
            name: 'payment',
            selected: formik.values.paymentType,
            setSelected: () => formik.setFieldValue('paymentType', 'bank'),
          }}
        />
        <RadioInput
          option={{
            title: 'Післяоплата',
            value: 'afterpayment',
            name: 'payment',
            selected: formik.values.paymentType,
            setSelected: () =>
              formik.setFieldValue('paymentType', 'afterpayment'),
          }}
        />
      </div>

      <div className='bg-teal-700/10 p-4 rounded-md col-span-full sm:min-h-[150px]'>
        <h2 className='text-lg mb-4'>Контактні дані</h2>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          {formik.values.deliveryBy === 'ukr' && (
            <Input
              title='Прізвище'
              name='surname'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.surname ?? ''}
              touched={formik.touched}
              errors={formik.errors}
              labelClassName='min-h-[72px]'
            />
          )}

          <Input
            title='Ім`я'
            name='name'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            touched={formik.touched}
            errors={formik.errors}
            labelClassName='min-h-[72px]'
          />

          {formik.values.deliveryBy === 'ukr' && (
            <Input
              title='По батькові'
              name='fatherName'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fatherName ?? ''}
              touched={formik.touched}
              errors={formik.errors}
              labelClassName='min-h-[72px]'
            />
          )}

          <Input
            title='Телефон'
            name='phone'
            type='text'
            placeholder='+380... або 0...'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            touched={formik.touched}
            errors={formik.errors}
            labelClassName='min-h-[72px]'
          />

          <Input
            title='Пошта'
            name='email'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email ?? null}
            touched={formik.touched}
            errors={formik.errors}
            labelClassName='min-h-[72px]'
          />
        </div>
      </div>

      <div className='bg-teal-700/10 p-4 rounded-md col-span-full sm:min-h-[150px]'>
        <h2 className='text-lg mb-4'>Доставка</h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <Input
            title='Місто'
            name='deliveryTo'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.deliveryTo}
            touched={formik.touched}
            errors={formik.errors}
            labelClassName='min-h-[72px]'
          />

          {formik.values.deliveryBy === 'ukr' ? (
            <Input
              title='Поштовий індекс'
              name='postCode'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.postCode ?? ''}
              touched={formik.touched}
              errors={formik.errors}
              labelClassName='min-h-[72px]'
            />
          ) : (
            <Input
              title='Номер відділення'
              name='postNumber'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.postNumber ?? ''}
              touched={formik.touched}
              errors={formik.errors}
              labelClassName='min-h-[72px]'
            />
          )}
        </div>
      </div>

      <div className='bg-teal-700/10 p-4 rounded-md col-span-full sm:min-h-[150px]'>
        <OrderProducts
          products={productsFromStore}
          titleClassName='text-lg'
          isAddOrder
          onRemoveProduct={handleDeleteProductFromCart}
        />

        <AddElementButton
          title='замовлення'
          onClick={handleAddProductToCart}
          className='mt-4 mx-auto'
        />
      </div>

      <div className='col-span-full'>
        <h2 className='text-2xl'>
          Загальна сума рахунку:{' '}
          <span className='font-bold'>{formattedPrice(totalOrderPrice)}</span>{' '}
        </h2>
      </div>

      <div className='col-span-full flex gap-4 items-center justify-center mt-6'>
        <SubmitButton
          title='Зберегти'
          isSubmitting={isSubmitting}
          disabled={productsFromStore.length < 1}
          className='px-4 py-2'
        />
        {!isAddForm && (
          <>
            <p className='block text-center text-sm uppercase'>Або</p>

            {formik.values.isArchive ? (
              <DeleteButton
                onClick={handleDeleteButton}
                isSubmitting={isSubmitting}
                withoutSpinner
              />
            ) : (
              <DeleteButton
                title='Архівувати'
                toArchive
                onClick={handleArchiveButton}
                isSubmitting={isSubmitting}
                withoutSpinner
              />
            )}
          </>
        )}
      </div>

      <AddProductsModal />
    </form>
  );
}
