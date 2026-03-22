'use client';

import { Star } from 'lucide-react';
import { useState } from 'react';

interface IStarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
}

export default function StarRating({
  value,
  onChange,
  readOnly = false,
}: IStarRatingProps) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className='flex gap-1'>
      {[1, 2, 3, 4, 5].map(star => {
        const filled = star <= (hovered || value);
        return (
          <button
            key={star}
            type='button'
            disabled={readOnly}
            onClick={() => !readOnly && onChange?.(star)}
            onMouseEnter={() => !readOnly && setHovered(star)}
            onMouseLeave={() => !readOnly && setHovered(0)}
            className='disabled:cursor-default'
            aria-label={`${star} зірок`}
          >
            <Star
              size={20}
              className={
                filled
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-none text-gray-300'
              }
            />
          </button>
        );
      })}
    </div>
  );
}
