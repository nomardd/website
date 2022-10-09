import AuthModal from '@/modules/auth/components/AuthModal';
import * as React from 'react';

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);

  return (
    <header className='navbar bg-base-100'>
      <div className='flex-none'>
        <button className='btn btn-ghost btn-square'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='inline-block h-5 w-5 stroke-current'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16M4 18h16'
            ></path>
          </svg>
        </button>
      </div>
      <div className='flex-1'>
        <a className='btn btn-ghost text-xl normal-case'>Nomard</a>
      </div>
      <div className='flex-none'>
        <button
          className='btn btn-ghost btn-square'
          onClick={() => setIsAuthModalOpen(true)}
        >
          LOG IN
        </button>
      </div>
      <AuthModal setIsOpen={setIsAuthModalOpen} isOpen={isAuthModalOpen} />
    </header>
  );
}
