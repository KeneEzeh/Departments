'use client';
import { ApolloProvider, InMemoryCache, ApolloClient, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ReactNode, useEffect, useState } from 'react';

export function ApolloWrapper({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<ApolloClient<unknown> | null>(null);

  useEffect(() => {
    const httpLink = new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL,
      credentials: 'include',
    });

    const authLink = setContext((_, { headers }) => {
      const token = localStorage.getItem('token');
      return {
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : '',
        },
      };
    });

    const apolloClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });

    setClient(apolloClient);
  }, []);

  if (!client) return null;

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
