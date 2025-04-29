// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { ApolloWrapper } from '@/lib/apollo-wrapper';

export const metadata = {
  title: 'Department Hierarchy App',
  description: 'Manage and view nested departments',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
