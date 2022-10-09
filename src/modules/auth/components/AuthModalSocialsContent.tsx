import { useEffect, useState } from 'react';
import { Web3AuthCore } from '@web3auth/core';
import {
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
} from '@web3auth/base';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
// import RPC from './ethersRPC' // for using ethers.js
import RPC from './../../web3auth/web3RPC'; // for using web3.js

const clientId =
  'BB-aCdK7xRKNtFdDfxvgZm-FJJT0atLIQdIYXdoJ5Xf_QkmkkKmuG2r6pkjcUoxb9RisGye-s1UlOU-z_62rxc8'; // get from https://dashboard.web3auth.io

function AuthModalSocialsContent() {
  const [web3auth, setWeb3auth] = useState<Web3AuthCore | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3AuthCore({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: '0x3',
          },
        });

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            network: 'testnet',
            uxMode: 'popup',
            loginConfig: {
              google: {
                name: 'Google Auth Login',
                verifier: 'web3auth-core-google',
                typeOfLogin: 'google',
                clientId:
                  '774338308167-q463s7kpvja16l4l0kko3nb925ikds2p.apps.googleusercontent.com', //use your app client id you got from google
              },
              discord: {
                name: 'Discord Auth Login',
                verifier: 'web3auth-core-discord',
                typeOfLogin: 'discord',
                clientId: '993506120276648017', //use your app client id you got from discord
              },
            },
          },
        });
        web3auth.configureAdapter(openloginAdapter);
        setWeb3auth(web3auth);

        await web3auth.init();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async (type: 'google' | 'discord') => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: type,
      }
    );
    setProvider(web3authProvider);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const getChainId = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    console.log(chainId);
  };
  const getAccounts = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    console.log(address);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    console.log(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    console.log(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    console.log(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    console.log(privateKey);
  };
  const loggedInView = (
    <div>
      <button onClick={getUserInfo} className='card'>
        Get User Info
      </button>
      <button onClick={getChainId} className='card'>
        Get Chain ID
      </button>
      <button onClick={getAccounts} className='card'>
        Get Accounts
      </button>
      <button onClick={getBalance} className='card'>
        Get Balance
      </button>
      <button onClick={sendTransaction} className='card'>
        Send Transaction
      </button>
      <button onClick={signMessage} className='card'>
        Sign Message
      </button>
      <button onClick={getPrivateKey} className='card'>
        Get Private Key
      </button>
      <button onClick={logout} className='card'>
        Log Out
      </button>
      <div id='console' style={{ whiteSpace: 'pre-line' }}>
        <p style={{ whiteSpace: 'pre-line' }}></p>
      </div>
    </div>
  );

  // const unloggedInView = (
  //   <button onClick={login} className='card'>
  //     Login
  //   </button>
  // );

  const unloggedInView = (
    <div className='flex w-full flex-row'>
      <button
        className='btn flex flex-row items-center duration-100 ease-in-out'
        onClick={() => login('google')}
      >
        <img src='/images/google.png' alt='Metamask' className='mr-2 h-4 w-4' />
        Google
      </button>
      <button
        className='btn ml-4 flex flex-row items-center justify-center  duration-100 ease-in-out'
        onClick={() => login('discord')}
      >
        <img
          src='/images/discord.png'
          alt='Metamask'
          className='mr-2 h-4 w-4'
        />
        Discord
      </button>
    </div>
  );

  return (
    <div className='container'>
      <div className='grid justify-center'>
        {provider ? loggedInView : unloggedInView}
      </div>

      <footer className='footer w-full'>
        <a
          href='https://web3auth.io/'
          target='_blank'
          rel='noopener noreferrer'
          className='mx-auto mt-4 text-center text-sm'
        >
          Powered by Web3Auth
        </a>
      </footer>
    </div>
  );
}

export default AuthModalSocialsContent;
