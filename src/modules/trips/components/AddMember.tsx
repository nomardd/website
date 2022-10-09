import * as React from 'react';
import useContract from '@/modules/ethereum/lib/useContract';
import NomardABI from '../../ethereum/NomardABI.json';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';

const theNomardContract = '0x36EeD0A90F6649c39564cd9B121abe0396b41dFF';
export default function AddMember({ tripId }) {
  const [isCreatingTrip, setIsCreatingTrip] = React.useState(false);
  const [wallet, setWallet] = React.useState('');
  const { data: nomardContract, error: nomardContractError } = useContract(
    theNomardContract,
    NomardABI
  );
  const { account } = useWeb3React();

  const addTripMembers = React.useCallback(async () => {
    console.log({ tripId });
    if (!nomardContract || !wallet || !tripId) {
      return;
    }
    setIsCreatingTrip(true);
    const transaction = await nomardContract.addTripMembers(
      parseInt(tripId, 16),
      wallet
    );
    const awaitedTransaction = await transaction.wait();
    console.log({ transaction, awaitedTransaction });
    setIsCreatingTrip(false);
  }, [wallet, nomardContract, tripId]);

  return (
    <>
      <div className='mx-auto flex w-full flex-col' style={{ maxWidth: 400 }}>
        <h1 className='pb-4 text-center text-3xl'>Add user wallet</h1>
        <div className='flex flex-col'>
          <label htmlFor='wallet' className='text-lg'>
            User wallet
          </label>
          <input
            className='input w-full border-gray-500'
            value={wallet}
            id='wallet'
            onChange={(e) => {
              setWallet(e.target.value);
            }}
          />
        </div>
        <button
          className={`btn btn-primary mt-2 ${isCreatingTrip ? 'loading' : ''}`}
          onClick={addTripMembers}
        >
          ADD
        </button>
      </div>
    </>
  );
}
