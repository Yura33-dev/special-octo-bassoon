import CatalogNavBar from './catalog-nav/CatalogNavBar';
import HeaderBar from './HeaderBar';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className='relative z-10'>
      <HeaderBar />
      <SearchBar />
      <CatalogNavBar />
    </header>
  );
}
