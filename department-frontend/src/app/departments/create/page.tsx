'use client';

import DepartmentForm from '@/components/DepartmentForm';
import { useRouter } from 'next/navigation';

export default function CreateDepartmentPage() {
  const router = useRouter();
  return (
    <div className="p-6 m-7">
      <button className='mb-4 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition' onClick={() => router.back()}>
        <span className="text-gray-500 hover:text-blue-600 cursor-pointer" onClick={() => router.push('/departments')}>
          ← Back
        </span>
      </button>
      <h2 className="text-xl font-bold mb-4">Create Department</h2>
      <DepartmentForm mode='create' />
    </div>
  );
}