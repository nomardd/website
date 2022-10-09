import * as React from 'react';
import Layout from '@/components/layout/Layout';
import useContract from '@/modules/ethereum/lib/useContract';
import NomardABI from '../../ethereum/NomardABI.json';
import { useWeb3React } from '@web3-react/core';

const theNomardContract = '0x36EeD0A90F6649c39564cd9B121abe0396b41dFF';
export default function ApproveWithdraw({ shouldApprove, withdrawId }) {
  const [isCreatingTrip, setIsCreatingTrip] = React.useState(false);
  const { data: nomardContract, error: nomardContractError } = useContract(
    theNomardContract,
    NomardABI
  );
  const { account } = useWeb3React();

  const approveAction = React.useCallback(async () => {
    console.log({ nomardContract });
    if (!nomardContract || !withdrawId) {
      return;
    }
    setIsCreatingTrip(true);
    const transaction = await nomardContract.approveWithdraw(withdrawId);
    const awaitedTransaction = await transaction.wait();
    setIsCreatingTrip(false);
  }, [account, nomardContract, withdrawId]);

  return (
    <button
      className={`${shouldApprove ? 'btn-green-500' : 'btn-red-500'} btn  ${
        isCreatingTrip ? 'loading' : ''
      } w-fit`}
      onClick={approveAction}
    >
      {shouldApprove ? 'APPROVE' : 'DISAPPROVE'}
    </button>
  );
}
