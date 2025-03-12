'use client';

import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import React, { cloneElement, ReactElement } from 'react';

import { useModalStore } from '@/providers';

interface IModalWindowProps {
  title: string;
  children: React.ReactNode;
  modalId: string;
  className?: string;
}

export default function ModalWindow({
  children,
  title,
  modalId,
  className,
}: IModalWindowProps) {
  const closeModal = useModalStore(state => state.closeModal);
  const modals = useModalStore(state => state.modals);

  return (
    <AnimatePresence initial={false}>
      {modals[modalId] ? (
        <motion.div
          initial={{ opacity: 0, pointerEvents: 'none' }}
          animate={{ opacity: 1, pointerEvents: 'all' }}
          exit={{ opacity: 0, pointerEvents: 'none' }}
          transition={{ duration: 0.3 }}
          className='fixed top-0 left-0 z-10 w-full h-full bg-black/60 backdrop-blur-sm flex justify-center items-center'
        >
          <div
            className={clsx(
              'bg-white rounded-md p-4 w-full h-full max-w-[95%] max-h-[90%] lg:h-max overflow-y-auto',
              className && className
            )}
          >
            <div className='flex justify-between items-center mb-8'>
              <h3 className='text-2xl font-semibold'>{title}</h3>
              <button
                className='btn block h-auto min-h-min p-1 bg-primary hover:bg-primary-dark border-none'
                aria-label='Закрити модальне вікно'
                onClick={() => closeModal(modalId)}
              >
                <X
                  className='w-5 h-5'
                  color='white'
                  focusable={false}
                  aria-hidden={true}
                />
              </button>
            </div>
            {React.isValidElement(children) && typeof children.type !== 'string'
              ? cloneElement(children as ReactElement<{ modalId: string }>, {
                  modalId,
                })
              : children}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
