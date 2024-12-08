export default function CartBtn() {
  return (
    <div className='dropdown dropdown-end [backface-visibility:hidden]'>
      <div
        tabIndex={0}
        role='button'
        className='btn border-none flex bg-green-700 hover:bg-green-900 focus-visible:bg-green-900'
        aria-label='Відкрити кошик'
      >
        <div className='indicator'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-[24px] w-[24px]'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
            />
          </svg>
          <span className='badge badge-sm indicator-item bg-orange-500 border-none leading-none h-[20px] w-[20px]'>
            0
          </span>
        </div>
      </div>
      {/* <div className='card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow'>
        <div className='card-body bg-background rounded-md shadow-lg'>
          <span className='text-lg font-bold text-foreground'>8 товарів</span>
          <span className='text-foreground'>На суму: 693.57 грн</span>
          <div className='card-actions'>
            <button className='btn btn-primary btn-block bg-primary border-none outline-none hover:bg-accent focus-visible:ring-2 ring-accent ring-offset-2'>
              В кошик
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}
