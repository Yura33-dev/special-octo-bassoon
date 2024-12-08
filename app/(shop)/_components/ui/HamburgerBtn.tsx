export default function HamburgerBtn() {
  return (
    <button aria-label='Відкрити мобільне меню'>
      <label className='btn border-none bg-green-700 hover:bg-green-900 active:bg-green-900 swap swap-rotate'>
        <input type='checkbox' />

        {/* hamburger icon */}
        <svg
          className='swap-off fill-current'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 512 512'
        >
          <path d='M64,384  H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z' />
        </svg>

        {/* close icon */}
        <svg
          className='swap-on fill-current'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 512 512'
        >
          <polygon points='400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49' />
        </svg>
      </label>
    </button>
  );
}
