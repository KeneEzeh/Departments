'use client';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN, SIGNUP } from '@/graphql/mutations';
import { useRouter } from 'next/navigation';

type Props = { mode: 'login' | 'signup' };

export default function AuthForm({ mode }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [auth] = useMutation(mode === 'login' ? LOGIN : SIGNUP);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await auth({ variables: mode === 'login' ? { email, password } : { email, password, username } });
      console.log('Submitting form', { email, password });
      if(mode === 'login') {
        localStorage.setItem('token', res.data.login.access_token);
        router.push('/departments');
      } else {
        router.push('/auth/login');
      }

    } catch (err: unknown) {
    if (err instanceof Error) {
        console.error('Authentication error:', err.message);
      }
      alert('Authentication failed');
    }
  };

  return (
    <>
    <h1 className="text-center text-xl">{mode === 'login' ? "Login" : "SignUp"}</h1>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <input
        className="w-full border px-3 py-2 rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
{  mode === 'signup' &&  <input
        className="w-full border px-3 py-2 rounded"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />}
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
<p className="text-center">
      {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
      <button
        className="text-blue-500 ml-2"
        onClick={() => mode === 'login' ? router.push('/auth/signup') : router.push('/auth/login')}
      >
        Switch to {mode === 'login' ? 'Signup' : 'Login'} 
      </button>
    </p>
    </>
  );
}