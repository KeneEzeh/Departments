'use client';
import DepartmentForm from '@/components/DepartmentForm';

export default function UpdateDepartmentPage({params}: {params: {id: string}}) {
  const { id } = params;
  // const { id } = useParams();
  console.log(id);
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Update Department</h2>
      <DepartmentForm  mode='update' id={id}/>
    </div>
  );
}