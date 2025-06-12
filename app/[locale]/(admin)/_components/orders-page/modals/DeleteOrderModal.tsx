import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

import { IOrderMapped } from '@/types';

import DeleteOrderForm from '../forms/DeleteOrderForm';

interface IDeleteOrderModalProps {
  order: IOrderMapped;
  isSelectedToDelete: boolean;
  setIsSelectedOrderToDelete: (value: boolean) => void;
}

export default function DeleteOrderModal({
  order,
  isSelectedToDelete,
  setIsSelectedOrderToDelete,
}: IDeleteOrderModalProps) {
  return (
    <AnimatePresence>
      {isSelectedToDelete ? (
        <motion.div
          initial={{ opacity: 0, pointerEvents: 'none' }}
          animate={{ opacity: 1, pointerEvents: 'all' }}
          exit={{ opacity: 0, pointerEvents: 'none' }}
          transition={{ duration: 0.2 }}
          className={clsx(
            'fixed top-0 left-0 z-10 w-full h-full flex justify-center items-center bg-black/60 backdrop-blur-sm'
          )}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.2,
            }}
            className={clsx(
              'bg-white rounded-md p-4 w-full h-full max-h-[685px] lg:max-w-[600px] lg:h-max overflow-y-auto'
            )}
          >
            <div className='flex justify-between items-center mb-8'>
              <h3 className='text-2xl font-semibold'>
                Видалити замовлення з архіву
              </h3>
              <button
                type='button'
                className='btn block h-auto min-h-min p-1 bg-primary hover:bg-primary-dark border-none'
                aria-label='Закрити модальне вікно'
                onClick={() => setIsSelectedOrderToDelete(false)}
              >
                <X
                  className='w-5 h-5'
                  color='white'
                  focusable={false}
                  aria-hidden={true}
                />
              </button>
            </div>

            <DeleteOrderForm
              orderId={order.id}
              orderNumber={order.orderNumber}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
