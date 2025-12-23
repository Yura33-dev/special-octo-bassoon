'use client';

import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useRef, useState } from 'react';
import { useFormState } from 'react-dom';

import { submitOrder } from '@/lib/actions';
import { formattedPrice } from '@/lib/utils';
import { useCartStore } from '@/providers';
import { IOrderState } from '@/types';

import CheckoutButton from './CheckoutButton';
import CustomRadioInput from './CustomRadioInput';
import CustomTextInput from './CustomTextInput';
import NoProductsYet from './NoProductsYet';

interface ICheckoutFormProps {
  className?: string;
}

const initialState: IOrderState = {
  errors: {},
  success: false,
  orderNumber: null,
};

export default function CheckoutForm({ className }: ICheckoutFormProps) {
  const cart = useCartStore(state => state.cart);
  const totalCartPrice = useCartStore(state => state.getTotalPrice());

  const [deliveryMethod, setDeliveryMethod] = useState<string>('np');
  const [paymentMethod, setPaymentMethod] = useState<string>('bank');

  const formRef = useRef<HTMLFormElement>(null);

  const [data, formAction] = useFormState(submitOrder, initialState);

  const t = useTranslations('CheckoutPage');
  const locale = useLocale();

  const cartItemsJson = useMemo(
    () =>
      JSON.stringify(
        cart.map(item => ({
          productId: item.id,
          packId: item.packVariant.packId.id,
          quantity: item.packVariant.orderedQuantity,
          price: item.packVariant.price,
        }))
      ),
    [cart]
  );

  return (
    <>
      {cart.length <= 0 ? (
        <NoProductsYet />
      ) : (
        <form
          ref={formRef}
          action={formAction}
          className={clsx(
            className && `${className}`,
            'grid grid-cols-2 gap-4 md:content-start'
          )}
        >
          <input
            type='hidden'
            name='totalPrice'
            value={totalCartPrice.toString()}
          />
          <input type='hidden' name='products' value={cartItemsJson} />
          <input type='hidden' name='locale' value={locale} />

          <div className='bg-white p-4 rounded-md col-span-full sm:min-h-[150px] sm:col-start-1 sm:col-end-2'>
            <h2 className='text-lg mb-4'>{t('DeliveryMethodTitle')}</h2>

            <div className='flex flex-col'>
              <CustomRadioInput
                option={{
                  title: 'Укрпошта',
                  value: 'ukr',
                  name: 'delivery',
                  selected: deliveryMethod,
                  setSelected: setDeliveryMethod,
                }}
              />
              <CustomRadioInput
                option={{
                  title: 'Нова пошта',
                  value: 'np',
                  name: 'delivery',
                  selected: deliveryMethod,
                  setSelected: setDeliveryMethod,
                }}
              />
            </div>
          </div>

          <div className='bg-white p-4 rounded-md col-span-full sm:min-h-[150px] sm:col-start-2 sm:col-end-3'>
            <h2 className='text-lg mb-4'>{t('PaymentMethodTitle')}</h2>

            <div className='flex flex-col'>
              <CustomRadioInput
                option={{
                  title: 'Банківський переказ',
                  value: 'bank',
                  name: 'payment',
                  selected: paymentMethod,
                  setSelected: setPaymentMethod,
                }}
              />
              <CustomRadioInput
                option={{
                  title: 'Післяоплата',
                  value: 'afterpayment',
                  name: 'payment',
                  selected: paymentMethod,
                  setSelected: setPaymentMethod,
                }}
              />
            </div>
          </div>

          <div className='bg-white p-4 rounded-md col-span-full sm:min-h-[150px]'>
            <h2 className='text-lg mb-4'>{t('ContactsData')}</h2>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              {deliveryMethod === 'ukr' && (
                <CustomTextInput
                  label='Прізвище'
                  type='text'
                  name='customerLastName'
                  errorMessage={data.errors.customerLastName}
                />
              )}

              <CustomTextInput
                label='Ім`я'
                type='text'
                name='customerName'
                errorMessage={data.errors.customerName}
              />

              {deliveryMethod === 'ukr' && (
                <CustomTextInput
                  label='По-батькові'
                  type='text'
                  name='customerFatherName'
                  errorMessage={data.errors.customerFatherName}
                />
              )}

              <CustomTextInput
                label='Телефон'
                type='text'
                name='customerPhone'
                errorMessage={data.errors.customerPhone}
              />

              <CustomTextInput
                label='Електронна пошта'
                type='text'
                name='customerEmail'
                errorMessage={data.errors.customerEmail}
              />
            </div>
          </div>

          <div className='bg-white p-4 rounded-md col-span-full sm:min-h-[150px]'>
            <h2 className='text-lg mb-4'>{t('DeliveryAddress')}</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <CustomTextInput
                label='Місто'
                type='text'
                name='city'
                errorMessage={data.errors.city}
              />

              {deliveryMethod === 'ukr' ? (
                <CustomTextInput
                  label='Поштовий індекс'
                  type='text'
                  name='postCode'
                  errorMessage={data.errors.postCode}
                />
              ) : (
                <CustomTextInput
                  label='Номер відділення'
                  type='text'
                  name='postNumber'
                  errorMessage={data.errors.postNumber}
                />
              )}
            </div>
          </div>

          <div className='bg-white rounded-md p-4 text-center col-span-full sm:min-h-[150px]'>
            <h5 className='text-xl'>
              {t('TotalCost')} {formattedPrice(totalCartPrice)}
            </h5>

            <CheckoutButton />
          </div>
        </form>
      )}
    </>
  );
}
