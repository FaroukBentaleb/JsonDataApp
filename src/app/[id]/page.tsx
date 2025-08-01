'use client';

import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { useEffect, useState } from 'react';
import { JsonData } from '@prisma/client';

export default function SharedJson({
  params
}: {
  params: { id: string }
}) {
  const { id } = params;
  const [jsonData, setJsonData] = useState<JsonData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/json/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data?.content) {
          throw new Error('Invalid data format');
        }

        setJsonData(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="mt-8 text-red-500">{error}</div>;
  }

  if (!jsonData) {
    return <div className="mt-8">No data available</div>;
  }

  return (
    <div className="mt-8 space-y-4">
      <h1 className="text-2xl underline font-bold">{jsonData.name}</h1>
      <CodeMirror
        value={jsonData.content}
        height="400px"
        extensions={[json()]}
        editable={false}
        className="border shadow-sm"
      />
    </div>
  );
}