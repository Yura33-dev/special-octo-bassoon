import { IPagination } from '@/types';

interface IPaginationProps {
  paginationData: IPagination;
  handlePageChange: (page: number) => void;
}

export default function Pagination({
  paginationData,
  handlePageChange,
}: IPaginationProps) {
  const { totalPages, page, hasPrevPage, hasNextPage } = paginationData;

  return (
    <div className='mt-24 flex gap-1 justify-center'>
      {hasPrevPage && page !== 1 && (
        <button
          type='button'
          className='btn w-[3rem] border-none bg-primary text-white hover:bg-green-800'
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      )}

      {hasPrevPage && page > 2 && (
        <>
          {page >= 4 && (
            <button
              type='button'
              className='btn w-[3rem] border-none bg-primary text-white hover:bg-green-800'
            >
              ...
            </button>
          )}

          <button
            type='button'
            className='btn w-[3rem] border-none bg-primary text-white hover:bg-green-800'
            onClick={() => handlePageChange(page - 1)}
          >
            {page - 1}
          </button>
        </>
      )}

      <button
        type='button'
        className='bg-accent btn w-[3rem] border-none text-white hover:bg-green-800'
      >
        {page}
      </button>

      {hasNextPage && page !== totalPages - 1 && (
        <button
          type='button'
          className='btn w-[3rem] border-none bg-primary text-white hover:bg-green-800'
          onClick={() => handlePageChange(page + 1)}
        >
          {page + 1}
        </button>
      )}

      {hasNextPage && page !== totalPages && (
        <>
          {page + 2 < totalPages && (
            <button
              type='button'
              className='btn w-[3rem] border-none bg-primary text-white hover:bg-green-800'
            >
              ...
            </button>
          )}

          <button
            type='button'
            className='btn w-[3rem] border-none bg-primary text-white hover:bg-green-800'
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}
    </div>
  );
}
