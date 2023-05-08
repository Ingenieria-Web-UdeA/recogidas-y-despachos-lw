import type { AppProps } from 'next/app';
import '@styles/globals.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const client = new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache(),
  });
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
        <ToastContainer />
      </ApolloProvider>
    </SessionProvider>
  );
};

export default App;
