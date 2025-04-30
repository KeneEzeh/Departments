'use client';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_DEPARTMENT, UPDATE_DEPARTMENT } from '@/graphql/mutations';
import { useRouter } from 'next/navigation';
import { ParamValue } from 'next/dist/server/request/params';

type myProps = { mode: 'create' | 'update', id?: ParamValue };
export default function DepartmentForm({mode,id}: myProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [subs, setSubs] = useState<string[]>([]);
  const [mutate] = useMutation( mode === 'create' ? CREATE_DEPARTMENT : UPDATE_DEPARTMENT);
  console.log(mode,id);

  const handleAddSub = () => setSubs([...subs, '']);
  const handleSubChange = (value: string, index: number) => {
    const updated = [...subs];
    updated[index] = value;
    setSubs(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = {
      name,
      subDepartments: subs.filter(Boolean).map((s) => ({ name: s })),
    };
    await mutate({ variables: mode === 'create' ? { input } : { id, input } });
    console.log('Submitting form', input);
    alert(`Department ${mode === 'create' ? "created" : 'updated'}created successfully`);
    setName('');
    setSubs([]);
    router.push('/departments');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input className="border p-2 rounded w-full" value={name} onChange={(e) => setName(e.target.value)} placeholder="Department name" />
      {mode === 'update' && <input className="border p-2 rounded w-full cursor-not-allowed" value={id} readOnly  placeholder="Department Id" />}
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
        {mode === 'create' ? 'Create Department' : 'Update Department'}
      </button>
    </form>
  );
}