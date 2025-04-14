'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { CircleChevronDown } from 'lucide-react';

interface IOrderHeaderProps {
  orderNumber: string;
  orderStatus: string;
  orderDate: string | null;
  isOpen: boolean;
  onChange: () => void;
}

export default function OrderHeader({
  orderNumber,
  orderStatus,
  orderDate,
  isOpen,
  onChange,
}: IOrderHeaderProps) {
  return (
    <div
      className={clsx(
        'pt-4 px-4 pb-2 flex justify-start items-center gap-4 border-b-[1px] transition-colors duration-700 relative',
        isOpen ? 'border-gray-400' : 'border-transparent'
      )}
    >
      <h2 className='text-lg flex-grow-0 flex-shrink-0'>
        Рахунок <span className='font-semibold'>{orderNumber}</span>
      </h2>
      <span className='text-sm flex-grow-1 basis-full'>
        (статус: {orderStatus})
      </span>

      <div className='flex-shrink-0 flex-grow-1 basis-auto flex items-center gap-2'>
        {orderDate && (
          <div className='text-sm text-gray-600 '>
            {new Date(orderDate).toLocaleString('uk-UA', {
              timeZone: 'Europe/Kiev',
            })}
          </div>
        )}
        <motion.button
          variants={{
            open: { rotate: '180deg' },
            closed: { rotate: '0deg' },
          }}
          animate={isOpen ? 'open' : 'closed'}
          type='button'
          className='text-primary'
          onClick={onChange}
        >
          <CircleChevronDown className='w-5 h-5' />
        </motion.button>
      </div>
    </div>
  );
}
