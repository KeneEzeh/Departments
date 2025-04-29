'use client';
import { useQuery } from '@apollo/client';
import { GET_DEPARTMENTS } from '@/graphql/queries';
import DepartmentTree from '@/components/DepartmentTree';
import { useState } from 'react';
import { LoadingOverlay } from '../../components/Loader';

export default function DepartmentsPage() {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery(GET_DEPARTMENTS, { variables: { page, limit: 5 } });
    console.log(data);

  if (loading) return <LoadingOverlay />;



  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Departments</h2>
      {data && <DepartmentTree departments={data?.getDepartments?.data} />}
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