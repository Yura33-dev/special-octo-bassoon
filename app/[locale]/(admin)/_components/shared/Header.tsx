import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';

// interface IHeaderProps {}

export default function Header() {
  return (
    <header className='flex w-full justify-between items-center p-4 gap-4 h-16 bg-primary fixed top-0 left-0 z-10 will-change-transform'>
      <h1 className='text-white text-2xl'>Proground Admin page</h1>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
