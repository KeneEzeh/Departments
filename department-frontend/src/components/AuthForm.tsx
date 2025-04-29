'use client';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN, SIGNUP } from '@/graphql/mutations';
import { useRouter } from 'next/navigation';

type Props = { mode: 'login' | 'signup' };

export default function AuthForm({ mode }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth] = useMutation(mode === 'login' ? LOGIN : SIGNUP);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log('Submitting form', { email, password });
      console.log('Auth mutation', auth);
      await auth({ variables: { email, password } });
      router.push('/departments');
    } catch (err) {
      alert('Authentication failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <input
        className="w-full border px-3 py-2 rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full border px-3 py-2 rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        {mode === 'login' ? 'Login' : 'Signup'}
      </button>
    </form>
  );
}