'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface IInputErrorMessageProps {
  message: string | undefined;
}

export default function InputErrorMessage({
  message,
}: IInputErrorMessageProps) {
  return (
    <AnimatePresence initial={false}>
      {message ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='text-red-500 text-xs mt-1 pl-2'
        >
          {message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
