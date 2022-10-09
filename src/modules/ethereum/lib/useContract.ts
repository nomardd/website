import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';

export default function useContract(address: string, ABI: any) {
  const { library, account, chainId } = useWeb3React();

  return useMemo(() => {
    let error = null,
      data = null;
    console.log({ library, account, chainId, ABI });
    if (!address || !ABI || !library || !chainId) {
      return {
        data,
        error: 'Address|ABI|Library|ChainID are not set-up correctly',
      };
    }

    try {
      data = new Contract(address, ABI, library.getSigner(account));
    } catch (error) {
      console.log({ error });
      console.error('Failed To Get Contract', error);
      error = 'Failed To Get Contract';
    }

    return { data, error };
  }, [address, ABI, library, account, chainId]);
}
