'use client';

import { ApolloProvider, InMemoryCache, ApolloClient, HttpLink } from '@apollo/client';
import { ReactNode, useEffect, useState } from 'react';

export function ApolloWrapper({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<ApolloClient<any> | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token') || '';

    const apolloClient = new ApolloClient({
      link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_API_URL,
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      cache: new InMemoryCache(),
    });

    setClient(apolloClient);
  }, []);

  if (!client) return null; // or a loading spinner

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
