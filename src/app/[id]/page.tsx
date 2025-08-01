'use client';

import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { useEffect, useState } from 'react';
import { JsonData } from '@prisma/client';

interface PageProps {
  params: {
    id: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function SharedJson({ params }: PageProps) {
  const { id } = params;
  const [jsonData, setJsonData] = useState<JsonData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/json/${id}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className='mt-8'>Loading...</div>;
  if (!jsonData) return <div className='mt-8'>No data found</div>;

  return (
    <div className='mt-8 space-y-4'>
      <h1 className='text-2xl underline font-bold'>{jsonData.name}</h1>
      <CodeMirror
        value={jsonData.content}
        height='400px'
        extensions={[json()]}
        editable={false}
        className='border shadow-sm'
      />
    </div>
  );
}