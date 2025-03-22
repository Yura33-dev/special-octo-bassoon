'use client';

import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import React, { cloneElement, ReactElement, useEffect } from 'react';

import { useRouter } from '@/i18n/routing';
import { useModalStore } from '@/providers';

interface IModalWindowProps {
  title: string;
  children: React.ReactNode;
  modalId: string;
  className?: string;
  isModalSlot?: boolean;
  initial?: boolean;
}

export default function ModalWindow({
  children,
  title,
  modalId,
  className,
  isModalSlot = false,
  initial = false,
}: IModalWindowProps) {
  const closeModal = useModalStore(state => state.closeModal);
  const modals = useModalStore(state => state.modals);

  const router = useRouter();

  useEffect(() => {
    const isAnyModalOpen = Object.values(modals).some(isOpen => isOpen);
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isAnyModalOpen) {
      setTimeout(() => {
        document.body.classList.add('overflow-hidden');
        document.body.style.marginRight = `${scrollbarWidth}px`;
      }, 10);
    } else {
      setTimeout(() => {
        document.body.classList.remove('overflow-hidden');
        document.body.style.marginRight = '';
      }, 200);
    }
  }, [modals]);

  const handleCloseModal = () => {
    let timer: NodeJS.Timeout;

    if (isModalSlot) {
      closeModal(modalId);
      timer = setTimeout(() => router.back(), 210);
    } else {
      closeModal(modalId);
    }

    return () => clearTimeout(timer);
  };

  return (
    <AnimatePresence initial={initial}>
      {modals[modalId] ? (
        <motion.div
          initial={{ opacity: 0, pointerEvents: 'none' }}
          animate={{ opacity: 1, pointerEvents: 'all' }}
          exit={{ opacity: 0, pointerEvents: 'none' }}
          transition={{ duration: 0.2 }}
          className='fixed top-0 left-0 z-10 w-full h-full bg-black/60 backdrop-blur-sm flex justify-center items-center'
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.2,
            }}
            className={clsx(
              'bg-white rounded-md p-4 w-full h-full max-w-[95%] max-h-[685px] lg:h-max overflow-y-auto',
              className && className
            )}
          >
            <div className='flex justify-between items-center mb-8'>
              <h3 className='text-2xl font-semibold'>{title}</h3>
              <button
                className='btn block h-auto min-h-min p-1 bg-primary hover:bg-primary-dark border-none'
                aria-label='Закрити модальне вікно'
                onClick={handleCloseModal}
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
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
