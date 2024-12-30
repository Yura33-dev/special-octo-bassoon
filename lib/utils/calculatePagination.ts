import { IPagination } from '@/types';

export const calculatePaginationData = (
  totalCount: number,
  perPage: number,
  page: number
): IPagination => {
  const totalPages = Math.ceil(totalCount / perPage);
  const hasNextPage = Boolean(totalPages - page);
  const hasPrevPage = page !== 1;

  return {
    page,
    perPage,
    totalItems: totalCount,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
};
