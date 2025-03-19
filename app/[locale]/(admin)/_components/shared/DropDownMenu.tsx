'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { Ellipsis } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface IDropDownMenuProps {
  children: React.ReactNode;
  onMenuItemClick?: () => void;
}

export default function DropDownMenu({
  children,
  onMenuItemClick,
}: IDropDownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (_: MouseEvent) => {
    if (onMenuItemClick) {
      onMenuItemClick();
    }
    setIsOpen(false);
  };

  return (
    <div className='flex justify-center' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className={clsx(
          'p-1 rounded-md transition-colors text-white hover:bg-primary-dark',
          isOpen ? 'bg-primary-dark' : 'bg-primary'
        )}
      >
        <Ellipsis />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='p-1 absolute left-0 top-full mt-1 bg-white shadow-md rounded-md w-[150px] z-10'
          >
            {React.Children.map(children, child => {
              if (!React.isValidElement(child)) return child;

              return React.cloneElement(child as React.ReactElement, {
                onClick: (event: MouseEvent) => {
                  handleItemClick(event);
                  if (child.props.onClick) {
                    child.props.onClick(event);
                  }
                },
              });
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
