'use client';

import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { ReactNode } from 'react';

const client = new ApolloClient({
  uri: 'http://localhost:3000/gql',
  cache: new InMemoryCache(),
  credentials: 'include',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export function ApolloWrapper({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
