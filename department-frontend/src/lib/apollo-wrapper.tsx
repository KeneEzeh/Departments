'use client';

import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { ReactNode } from 'react';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
  cache: new InMemoryCache(),
  credentials: 'include',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export function ApolloWrapper({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
