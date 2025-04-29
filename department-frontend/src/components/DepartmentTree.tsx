'use client';
export default function DepartmentTree({ departments }: { departments: any[] }) {
  return (
    <ul className="space-y-2">
      {departments.map((d) => (
        <li key={d.id}>
          <div className="font-semibold">{d.name}</div>
          {d.subDepartments?.length > 0 && (
            <ul className="ml-4 list-disc">
              {d.subDepartments.map((s: any) => (
                <li key={s.id}>{s.name}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
