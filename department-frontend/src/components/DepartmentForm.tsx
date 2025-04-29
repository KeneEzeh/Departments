'use client';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_DEPARTMENT } from '@/graphql/mutations';

export default function DepartmentForm() {
  const [name, setName] = useState('');
  const [subs, setSubs] = useState<string[]>([]);
  const [createDepartment] = useMutation(CREATE_DEPARTMENT);

  const handleAddSub = () => setSubs([...subs, '']);
  const handleSubChange = (value: string, index: number) => {
    const updated = [...subs];
    updated[index] = value;
    setSubs(updated);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const input = {
      name,
      subDepartments: subs.filter(Boolean).map((s) => ({ name: s })),
    };
    await createDepartment({ variables: { input } });
    setName('');
    setSubs([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input className="border p-2 rounded w-full" value={name} onChange={(e) => setName(e.target.value)} placeholder="Department name" />
      <div>
        {subs.map((sub, i) => (
          <input
            key={i}
            className="border p-2 rounded w-full mt-2"
            value={sub}
            onChange={(e) => handleSubChange(e.target.value, i)}
            placeholder={`Sub-department ${i + 1}`}
          />
        ))}
        <button type="button" onClick={handleAddSub} className="text-blue-500 mt-2">
          + Add Sub-department
        </button>
      </div>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Create Department
      </button>
    </form>
  );
}