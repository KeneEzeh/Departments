'use client';
import { useQuery } from '@apollo/client';
import { GET_DEPARTMENTS } from '@/graphql/queries';
import DepartmentTree from '@/components/DepartmentTree';
import { useState } from 'react';
import { LoadingOverlay } from '../../components/Loader';
import { useRouter } from 'next/navigation';

export default function DepartmentsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery(GET_DEPARTMENTS);
    console.log(data,page);

  if (loading) return <LoadingOverlay />;



  return (
    <div className="p-4 m-auto">
      <div className='flex justify-between items-center mb-4'>
      <h2 className="text-xl font-bold mb-4">Departments</h2>
      <button className='bg-gray-400 px-4 py-2 rounded text-white cursor-pointer'
      onClick={() => router.push('/departments/create')}
      >Create Department</button>

      </div>
      <h1>Click on any of the columns to update</h1>
      {data.getDepartments.length && <DepartmentTree departments={data?.getDepartments} />}
      <div className="mt-4 space-x-2">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} className="bg-gray-200 px-3 py-1 rounded">
          Prev
        </button>
        <button onClick={() => setPage((p) => p + 1)} className="bg-gray-200 px-3 py-1 rounded">
          Next
        </button>
      </div>
      
    </div>
  );
}