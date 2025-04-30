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
    <div className="overflow-x-auto bg-gray-100 p-4 rounded">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border-b text-left">Id</th>
            <th className="px-4 py-2 border-b text-left">Department</th>
            <th className="px-4 py-2 border-b text-left">Sub-departments</th>
          </tr>
        </thead>
        <tbody>
          {departments?.length &&
            departments.map((d: Department) => (
              <tr
                key={d.id}
                className="bg-white hover:bg-blue-100 cursor-pointer transition"
                onClick={() => handleRowClick(d.id)}
              >
                <td className="px-4 py-2 border-b font-semibold">{d.id}</td>
                <td className="px-4 py-2 border-b font-semibold">{d.name}</td>
                <td className="px-4 py-2 border-b text-gray-700">
                  {d.subDepartments && d.subDepartments.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {d.subDepartments.map((s: SubDepartment) => (
                        <li key={s.id}>{s.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="italic text-gray-400">None</span>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
  
}
