import HeaderBar from './HeaderBar';
import NavigationBar from './NavigationBar';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className='relative z-10'>
      <HeaderBar />
      <SearchBar />
      <NavigationBar />
    </header>
  );
}
