'use client';

import { ApolloProvider, InMemoryCache, ApolloClient, HttpLink } from '@apollo/client';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function ApolloWrapper({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<ApolloClient<unknown> | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/auth/login');
      return;
    }

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
  }, [router]);

  if (!client) return null;

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
