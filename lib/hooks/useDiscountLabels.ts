'use client';

import { useCallback, useState } from 'react';

interface IUseDiscountLabelsProps {
  labels: string[];
}

export default function UseDiscountLabels({ labels }: IUseDiscountLabelsProps) {
  const [appliedLabels, setAppliedLabels] = useState<string[]>(labels);

  const handleUpdateLabels = useCallback((value: boolean) => {
    if (value) {
      setAppliedLabels(prevLabels =>
        prevLabels.includes('sale') ? prevLabels : [...prevLabels, 'sale']
      );
    } else {
      setAppliedLabels(prevLabels =>
        prevLabels.filter(item => item !== 'sale')
      );
    }
  }, []);

  return { appliedLabels, handleUpdateLabels };
}
