// app/page.tsx
'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Welcome to the Department Manager</h1>
      <p className="mt-2">Use the links below to get started:</p>
      <ul className="mt-4 space-y-2">
        <li>
          <Link href="/auth/login" className="text-blue-600 underline">
            Login
          </Link>
        </li>
        <li>
          <Link href="/departments" className="text-blue-600 underline">
            View Departments
          </Link>
        </li>
      </ul>
    </main>
  );
}
