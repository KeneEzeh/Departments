'use client';

import { useRouter } from 'next/navigation';
interface Department {
  id: string;
  name: string;
  subDepartments?: SubDepartment[];
}

interface SubDepartment {
  id: string;
  name: string;
}
export default function DepartmentTree({ departments }: { departments: Department[] }) {
  const router = useRouter();
  const handleRowClick = (id: string) => {
    router.push(`/departments/update/${id}`); // change path as needed
  };
  console.log(departments);
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">All Departments</h2>
  
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700 border border-gray-200">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 border-b">ID</th>
              <th className="px-6 py-3 border-b">Department</th>
              <th className="px-6 py-3 border-b">Sub-departments</th>
            </tr>
          </thead>
          <tbody>
            {departments?.length > 0 ? (
              departments.map((d: Department) => (
                <tr
                  key={d.id}
                  className="bg-white hover:bg-blue-50 transition cursor-pointer"
                  onClick={() => handleRowClick(d.id)}
                >
                  <td className="px-6 py-4 border-b font-medium text-gray-800">{d.id}</td>
                  <td className="px-6 py-4 border-b font-semibold">{d.name}</td>
                  <td className="px-6 py-4 border-b">
                    {d.subDepartments && d.subDepartments.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {d.subDepartments.map((s: SubDepartment) => (
                          <li key={s.id} className="text-gray-600">
                            {s.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="italic text-gray-400">None</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-400 italic">
                  No departments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  
}
