'use client';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN, SIGNUP } from '@/graphql/mutations';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        <div className="hidden md:flex items-center justify-center bg-blue-50">
          <Image
            src="/undraw_mobile-login.svg"
            width={400}
            height={400}
            priority
            quality={100}
            alt="Welcome Illustration"
            className="w-3/4 h-auto"
          />
        </div>
  
        <div className="p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            {mode === 'login' ? 'Welcome Back 👋' : 'Create Your Account 🚀'}
          </h1>
  
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
  
            {mode === 'signup' && (
              <input
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            )}
  
            <input
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
  
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              {mode === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </form>
  
          <p className="text-center mt-6 text-gray-600 text-sm">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <button
              className="ml-2 text-blue-600 hover:underline font-medium"
              onClick={() =>
                mode === 'login' ? router.push('/auth/signup') : router.push('/auth/login')
              }
            >
              {mode === 'login' ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </main>
  );
  
}