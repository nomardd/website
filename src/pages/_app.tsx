import { AppProps } from 'next/app';
import getWeb3ProviderLibrary from '@/modules/ethereum/lib/getWeb3ProviderLibrary';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { useEffect, useState } from 'react';
import { injected } from '@/modules/ethereum/lib/connectors';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MetamaskProvider({ children }) {
  const {
    active: networkActive,
    error: networkError,
    activate: activateNetwork,
  } = useWeb3React();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    injected
      .isAuthorized()
      .then((isAuthorized) => {
        setLoaded(true);
        if (isAuthorized && !networkActive && !networkError) {
          activateNetwork(injected);
        }
      })
      .catch(() => {
        setLoaded(true);
      });
  }, [activateNetwork, networkActive, networkError]);
  if (loaded) {
    return children;
  }
  return <>Loading</>;
}

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/0xpasho/testgraph',
  cache: new InMemoryCache(),
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Web3ReactProvider getLibrary={getWeb3ProviderLibrary}>
        <MetamaskProvider>
          <Component {...pageProps} />
        </MetamaskProvider>
      </Web3ReactProvider>
    </ApolloProvider>
  );
}

export default MyApp;
