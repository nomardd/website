import AuthModal from '@/modules/auth/components/AuthModal';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import * as React from 'react';
import useENSName from './useENSName';

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const { active, error, activate, account, setError } = useWeb3React();
  const ENSName = useENSName(account);
  const router = useRouter();
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
          className='btn btn-ghost mr-4'
          onClick={() => {
            router.push('/trips');
          }}
        >
          My trips
        </button>
        <button
          className='btn btn-primary'
          onClick={() => setIsAuthModalOpen(true)}
        >
          {active && account ? ENSName || account : 'LOG IN'}
        </button>
      </div>
      <AuthModal setIsOpen={setIsAuthModalOpen} isOpen={isAuthModalOpen} />
    </header>
  );
}
