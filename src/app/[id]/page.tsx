// src/app/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { JsonData } from '@prisma/client';

interface ViewerProps {
  id: string;
}

function JsonViewer({ id }: ViewerProps) {
  const [jsonData, setJsonData] = useState<JsonData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/json/${id}`);
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

  if (loading) return <div className='mt-8'>loading...</div>;

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

// Actual Page component expected by Next.js
export default function Page({ params }: { params: { id: string } }) {
  return <JsonViewer id={params.id} />;
}
