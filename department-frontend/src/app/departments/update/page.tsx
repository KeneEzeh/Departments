import DepartmentForm from '@/components/DepartmentForm';

export default function UpdateDepartmentPage() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Update Department</h2>
      <DepartmentForm  mode='update'/>
    </div>
  );
}