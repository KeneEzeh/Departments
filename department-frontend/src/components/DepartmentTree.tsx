'use client';

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
  return (
    <ul className="space-y-2">
      {departments.map((d: Department) => (
        <li key={d.id}>
          <div className="font-semibold">{d.name}</div>
          {d.subDepartments && d.subDepartments.length > 0 && (
            <ul className="ml-4 list-disc">
              {d.subDepartments.map((s: SubDepartment) => (
                <li key={s.id}>{s.name}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
