'use client';
import DepartmentForm from '@/components/DepartmentForm';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function UpdateDepartmentPage() {
  const router = useRouter();
  // const { id } = params;
  const { id } = useParams();
  return (
    <div className="p-6">
        <button className='mb-4 bg-gray-200 hover:bg-gray-700 text-gray-700 px-4 py-2 rounded-lg transition' onClick={() => router.back()}>
          <span className="text-gray-500 hover:text-blue-600 cursor-pointer" onClick={() => router.push('/departments')}>
            ← Back
          </span>
        </button>
      <h2 className="text-xl font-bold mb-4">Update Department</h2>
      <DepartmentForm  mode='update' id={id}/>
    </div>
  );
}