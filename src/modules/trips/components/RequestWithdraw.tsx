import * as React from 'react';
import useContract from '@/modules/ethereum/lib/useContract';
import NomardABI from '../../ethereum/NomardABI.json';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';

const theNomardContract = '0x36EeD0A90F6649c39564cd9B121abe0396b41dFF';
export default function RequestWithdraw({ tripId }) {
  const [isCreatingTrip, setIsCreatingTrip] = React.useState(false);
  const [ipfs, setIpfs] = React.useState('');
  const router = useRouter();
  const [usdcAmount, setUsdcAmount] = React.useState(0);
  const { data: nomardContract, error: nomardContractError } = useContract(
    theNomardContract,
    NomardABI
  );
  const { account } = useWeb3React();

  const createProposal = React.useCallback(async () => {
    console.log({ tripId });
    if (!nomardContract || !account || !ipfs || !usdcAmount || !tripId) {
      return;
    }
    setIsCreatingTrip(true);
    const transaction = await nomardContract.withdrawRequest(
      usdcAmount,
      parseInt(tripId, 16),
      account,
      ipfs
    );
    const awaitedTransaction = await transaction.wait();
    console.log({ transaction, awaitedTransaction });
    setIsCreatingTrip(false);
  }, [account, nomardContract, usdcAmount, ipfs, account, tripId]);

  return (
    <>
      <div className='mx-auto flex w-full flex-col' style={{ maxWidth: 400 }}>
        <h1 className='pb-4 text-center text-3xl'>New Withdraw</h1>
        <div className='flex flex-col'>
          <label htmlFor='ipfs' className='text-lg'>
            IPFS Link
          </label>
          <input
            className='input w-full border-gray-500'
            value={ipfs}
            id='ipfs'
            onChange={(e) => {
              setIpfs(e.target.value);
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
          className={`btn btn-primary mt-2 ${isCreatingTrip ? 'loading' : ''}`}
          onClick={createProposal}
        >
          CONTINUE
        </button>
      </div>
    </>
  );
}
