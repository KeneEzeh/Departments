'use client';
import DepartmentForm from '@/components/DepartmentForm';
import { useParams } from 'next/navigation';

export default function UpdateDepartmentPage() {
  // const { id } = params;
  const { id } = useParams();
  console.log(id);
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Update Department</h2>
      <DepartmentForm  mode='update' id={id}/>
    </div>
  );
}