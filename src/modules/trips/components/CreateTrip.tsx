import * as React from 'react';
import Layout from '@/components/layout/Layout';
import useContract from '@/modules/ethereum/lib/useContract';
import NomardABI from '../../ethereum/NomardABI.json';
import { useWeb3React } from '@web3-react/core';

const theNomardContract = '0x36EeD0A90F6649c39564cd9B121abe0396b41dFF';
export default function CreateTrip() {
  const [isCreatingTrip, setIsCreatingTrip] = React.useState(false);
  const [name, setName] = React.useState('');
  const [usdcAmount, setUsdcAmount] = React.useState(0);
  const { data: nomardContract, error: nomardContractError } = useContract(
    theNomardContract,
    NomardABI
  );
  const { account } = useWeb3React();

  const createTrip = React.useCallback(async () => {
    console.log({ nomardContract });
    if (!nomardContract || !account || !name || !usdcAmount) {
      return;
    }
    setIsCreatingTrip(true);
    const transaction = await nomardContract.createTrip(
      account,
      name,
      usdcAmount
    );
    const awaitedTransaction = await transaction.wait();
    console.log({ transaction, awaitedTransaction });
    setIsCreatingTrip(false);
  }, [account, nomardContract, usdcAmount, name, account]);

  return (
    <>
      <div className='mx-auto flex w-full flex-col' style={{ maxWidth: 400 }}>
        <h1 className='pb-4 text-center text-3xl'>New Trip</h1>
        <div className='flex flex-col'>
          <label htmlFor='name' className='text-lg'>
            Name
          </label>
          <input
            className='input w-full border-gray-500'
            value={name}
            id='name'
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className='mt-6 flex flex-col'>
          <label htmlFor='usdcAmount text-lg'>
            Full Amount of the trip in $USDC
          </label>
          <span className='text-md text-gray-500'>
            Full amount for the team to travel
          </span>
          <input
            className='input w-full border-gray-500'
            type='number'
            id='usdcAmount'
            value={usdcAmount}
            onChange={(e) => {
              setUsdcAmount(Number(e.target.value) || 0);
            }}
          />
        </div>
        <button
          className={`btn btn-primary mt-8 ${isCreatingTrip ? 'loading' : ''}`}
          onClick={createTrip}
        >
          CREATE
        </button>
      </div>
    </>
  );
}
