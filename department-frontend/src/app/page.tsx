'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-2xl w-full text-center animate-fade-in">
        <div className="mb-6">
          <Image
            src="/undraw_team-collaboration.svg"
            alt="Teamwork Illustration"
            width={300}
            height={200}
            className="mx-auto"
            priority
          />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          Welcome to <span className="text-blue-600">Department Manager</span>
        </h1>
        <p className="text-gray-600 mb-6">Manage and organize your teams efficiently.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/auth/login"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition shadow"
          >
            Login
          </Link>
          <Link
            href="/departments"
            className="border border-blue-600 text-blue-600 py-2 px-6 rounded-lg hover:bg-blue-50 transition shadow"
          >
            View Departments
          </Link>
        </div>
      </div>
    </main>
  );
}
