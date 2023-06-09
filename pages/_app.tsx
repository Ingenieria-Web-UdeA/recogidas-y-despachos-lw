import type { AppProps } from 'next/app';
import '@styles/globals.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import { DateFiltersContextProvider } from '@context/dateFilterContext';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const client = new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache(),
  });
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <DateFiltersContextProvider>
          <Component {...pageProps} />
        </DateFiltersContextProvider>
        <ToastContainer />
      </ApolloProvider>
    </SessionProvider>
  );
};

export default App;
