'use client';
import { useQuery } from '@apollo/client';
import { GET_DEPARTMENTS } from '@/graphql/queries';
import DepartmentTree from '@/components/DepartmentTree';
import { useEffect, useState } from 'react';
import { LoadingOverlay } from '../../components/Loader';
import { useRouter } from 'next/navigation';

export default function DepartmentsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery(GET_DEPARTMENTS);
  console.log(page)

    useEffect(() => {
      if (error?.graphQLErrors[0]?.message === 'Unauthorized' || error?.graphQLErrors[0]?.message === 'Invalid token') {
        alert('Please login to access this page');
        router.push('/auth/login');
      }
      if(data?.getDepartments.length === 0) {
        alert('No departments found');
      }
    },[error, data]); 

  if (loading) return <LoadingOverlay />;




  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Departments</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          onClick={() => router.push('/departments/create')}
        >
          + Create Department
        </button>
      </div>
  
      <p className="text-gray-600 mb-4">Click on any department to update it.</p>
  
      {data?.getDepartments.length ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <DepartmentTree departments={data.getDepartments} />
        </div>
      ) : (
        <p className="text-gray-500 italic">No departments found.</p>
      )}
  
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
        >
          ← Prev
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
        >
          Next →
        </button>
      </div>
    </div>
  );
  
}