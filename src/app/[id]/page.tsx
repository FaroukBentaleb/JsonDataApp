'use client';

import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { useEffect, useState } from 'react';
import { JsonData } from '@prisma/client';

interface SharedJsonProps {
  params: {
    id: string;
  };
}
export default function SharedJson({ params }: SharedJsonProps) {
  const { id } = params;
  const [jsonData, setJsonData] = useState<JsonData>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/json/${id}`, { signal: controller.signal });
      const data = await response.json();
      setJsonData(data);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();

  return () => controller.abort(); // Cleanup
}, [id]);


  if (loading) {
    return <div className='mt-8'>loading...</div>;
  }
  return (
    <div className='mt-8 space-y-4'>
      <h1 className='text-2xl underline font-bold'>{jsonData?.name}</h1>
      <CodeMirror
        value={jsonData?.content || ''}
        height='400px'
        extensions={[json()]}
        editable={false}
        className='border shadow-sm'
      />
    </div>
  );
}