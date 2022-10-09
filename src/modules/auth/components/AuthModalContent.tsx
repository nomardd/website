import Button from '@/components/buttons/Button';
import { Dialog } from '@headlessui/react';
import * as React from 'react';
import { injected } from '@/modules/ethereum/lib/connectors';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import AuthModalSocialsContent from './AuthModalSocialsContent';

export default function AuthModalContent({
  onAuthenticate,
}: {
  onAuthenticate: () => void;
}) {
  const [isMetamaskLoading, setIsMetamaskLoading] = React.useState(false);
  const { activate } = useWeb3React();

  const handleMetamaskConnection = React.useCallback(async () => {
    setIsMetamaskLoading(true);
    const windowEthereum = (window as any).ethereum;
    // enabling is important as web3 isn't injected animore
    const addresses = await windowEthereum.enable();
    const currentWallet = addresses[0];
    if (!currentWallet) {
      return;
    }
    // @TODO: Catch activate errors
    activate(injected, undefined, true)
      .finally(async () => {
        const provider = new ethers.providers.Web3Provider(
          windowEthereum,
          'any'
        );

        const signer = provider.getSigner();
        await signer.signMessage('Signing in to Normard');
        setIsMetamaskLoading(false);
        onAuthenticate();
      })
      .catch((error) => {
        setIsMetamaskLoading(false);
      });
  }, [window, activate]);

  return (
    <div className='flex flex-col'>
      <h1 className='my-4 w-full text-center text-3xl font-semibold'>
        SIGN IN
      </h1>
      <div className='space-y-6'>
        <button
          className='btn btn-primary flex w-full flex-row items-center justify-center  gap-2 rounded  px-4 py-2 duration-100 ease-in-out'
          onClick={() => handleMetamaskConnection()}
        >
          <img src='/images/metamask.png' alt='Metamask' className='h-4 w-4' />
          Connect with Metamask {true ? '' : ''}
        </button>
      </div>
      <div className='divider py-8'>OR</div>
      <AuthModalSocialsContent />
    </div>
  );
}
