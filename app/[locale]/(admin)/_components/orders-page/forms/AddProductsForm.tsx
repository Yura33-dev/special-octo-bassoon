'use client';

import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import Select from 'react-select';

import { ADD_PRODUCTS_IN_ORDER } from '@/lib/constants';
import { formattedPackValue, formattedPrice } from '@/lib/utils';
import { useAdminStore, useModalStore } from '@/providers';
import {
  IProductInOrderMapped,
  IProductMapped,
  IProductPackItemMapped,
} from '@/types';

import SearchProductInput from '../../products-page/filter/SearchProductInput';
import DeleteElementButton from '../../products-page/forms/elements/DeleteElementButton';
import SubmitButton from '../../shared/forms-elements/SubmitButton';

export default function AddProductsForm() {
  const [selectedProducts, setSelectedProducts] = useState<IProductMapped[]>(
    []
  );
  const [productsToCart, setProductsToCart] = useState<IProductInOrderMapped[]>(
    []
  );

  const setProductsToStore = useAdminStore(store => store.setProductsToOrder);
  const closeModal = useModalStore(store => store.closeModal);

  const handleSelectProduct = (data: IProductMapped) => {
    if (selectedProducts.find(product => product.id === data.id)) {
      setSelectedProducts(state => [
        ...state.filter(product => product.id !== data.id),
      ]);
    } else {
      setSelectedProducts(state => [...state, data]);
    }
  };

  const handleChangePackaging = (
    packagings: IProductPackItemMapped[],
    product: IProductMapped
  ) => {
    setProductsToCart(prev => {
      const existingProductPacks = prev.filter(
        p => p.productId.id === product.id
      );

      const filtered = prev.filter(p => p.productId.id !== product.id);

      const updated = packagings.map(packaging => {
        const existing = existingProductPacks.find(
          p => p.packId.id === packaging.packId.id
        );

        return prepeareProductToOrder(
          product,
          packaging,
          existing?.quantity ?? 1
        );
      });

      return [...filtered, ...updated];
    });
  };

  const handleChangePackQuantity = (
    step: number,
    packId: string,
    productId: string
  ) => {
    setProductsToCart(state => {
      return state.map(i =>
        i.productId.id === productId && i.packId.id === packId
          ? { ...i, quantity: (i.quantity += step) }
          : i
      );
    });
  };

  const handleDeleteProductFromList = (product: IProductMapped) => {
    handleSelectProduct(product);
  };

  const handleSubmitSelectedProducts = () => {
    setProductsToStore(productsToCart);
    closeModal(ADD_PRODUCTS_IN_ORDER);
  };

  const productIdsInCart = productsToCart.map(prod => prod.productId.id);
  const emptyProduct = selectedProducts.every(product =>
    productIdsInCart.includes(product.id)
  );

  return (
    <div className='h-[550px] overflow-y-auto flex flex-col'>
      <div className='basis-full flex-grow'>
        <SearchProductInput
          inOrderPage
          onClick={handleSelectProduct}
          selectedProducts={selectedProducts.map(product => product.id)}
        />

        {selectedProducts.length > 0 ? (
          <ul className='grid grid-cols-1 gap-4'>
            {selectedProducts.map(product => (
              <li key={product.id} className='bg-teal-700/20 p-4 rounded-md'>
                <h3 className='text-lg mb-2'>
                  {product.translatedData['uk'].name}
                </h3>

                <div>
                  <h4 className='text-xs'>Оберіть упаковку:</h4>

                  <div className='flex gap-6 items-center'>
                    <Select<IProductPackItemMapped, true>
                      isMulti
                      placeholder='Оберіть пакування товару'
                      name={product.translatedData['uk'].name}
                      options={product.packaging.items}
                      getOptionLabel={pack => {
                        const packName = formattedPackValue(
                          pack.packId.translatedData['uk'].type,
                          pack.packId.translatedData['uk'].measureValue,
                          pack.packId.translatedData['uk'].measureIn
                        );
                        const tet = product.producer.exchangeRate
                          ? pack.price * product.producer.exchangeRate
                          : pack.price;

                        const packPrice = formattedPrice(tet);
                        return `${packName} - ${packPrice}`;
                      }}
                      getOptionValue={pack => pack.packId.id}
                      onChange={value =>
                        handleChangePackaging([...value], product)
                      }
                      classNames={{
                        container: ({ isFocused }) =>
                          isFocused
                            ? '!cursor-pointer basis-full flex-grow'
                            : 'basis-full flex-grow',
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
                    <DeleteElementButton
                      title='продукт'
                      onClick={() => handleDeleteProductFromList(product)}
                    />
                  </div>
                </div>

                {productsToCart
                  .filter(item => item.productId.id === product.id)
                  .map(itemInCart => {
                    return (
                      <div key={itemInCart.packId.id} className='mt-4'>
                        <h4 className='text-xs flex gap-1'>
                          Оберіть кількість для
                          <span className='font-bold'>
                            `
                            {formattedPackValue(
                              itemInCart.packId.translatedData['uk'].type,
                              itemInCart.packId.translatedData['uk']
                                .measureValue,
                              itemInCart.packId.translatedData['uk'].measureIn
                            )}
                            `:
                          </span>
                        </h4>

                        <div className='mt-2 flex'>
                          <button
                            type='button'
                            disabled={itemInCart.quantity <= 1}
                            className='w-7 h-7 bg-primary hover:bg-primary-dark transition rounded-md text-white flex items-center justify-center
                                        disabled:bg-gray-300'
                            onClick={() =>
                              handleChangePackQuantity(
                                -1,
                                itemInCart.packId.id,
                                itemInCart.productId.id
                              )
                            }
                          >
                            <Minus className='w-5 h-5' />
                          </button>
                          <div className='w-7 h-7 flex items-center justify-center bg-white rounded-sm'>
                            {itemInCart.quantity}
                          </div>
                          <button
                            type='button'
                            className='w-7 h-7 bg-primary hover:bg-primary-dark transition rounded-md text-white flex items-center justify-center'
                            onClick={() =>
                              handleChangePackQuantity(
                                +1,
                                itemInCart.packId.id,
                                itemInCart.productId.id
                              )
                            }
                          >
                            <Plus className='w-5 h-5' />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </li>
            ))}
          </ul>
        ) : (
          <h3 className='text-xl text-center'>Не обрано жодного товару</h3>
        )}
      </div>

      <SubmitButton
        title='Додати'
        buttonType='button'
        isSubmitting={false}
        disabled={selectedProducts.length <= 0 || !emptyProduct}
        className='mt-4 mx-auto flex-shrink-0'
        onClick={handleSubmitSelectedProducts}
      />
    </div>
  );
}

function prepeareProductToOrder(
  product: IProductMapped,
  packaging: IProductPackItemMapped,
  quantity: number
): IProductInOrderMapped {
  return {
    productId: {
      id: product.id,
      image: product.imgUrl,
      producer: {
        name: product.producer.translatedData['uk'].title,
        exchangeRate: product.producer.exchangeRate ?? 0,
      },
      translatedData: {
        uk: { name: product.translatedData['uk'].name },
        ru: { name: product.translatedData['ru'].name },
      },
    },
    packId: {
      id: packaging.packId.id,
      translatedData: {
        uk: {
          type: packaging.packId.translatedData['uk'].type,
          measureIn: packaging.packId.translatedData['uk'].measureIn,
          measureValue: packaging.packId.translatedData['uk'].measureValue,
        },
        ru: {
          type: packaging.packId.translatedData['ru'].type,
          measureIn: packaging.packId.translatedData['ru'].measureIn,
          measureValue: packaging.packId.translatedData['ru'].measureValue,
        },
      },
    },
    quantity,
    price: packaging.price,
  };
}
