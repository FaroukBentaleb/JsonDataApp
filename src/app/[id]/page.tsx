import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { JsonData } from '@prisma/client';

interface PageProps {
  params: {
    id: string;
  };
}

async function getJsonData(id: string): Promise<JsonData> {
  const response = await fetch(`http://localhost:3000/api/json/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

export default async function SharedJson({ params }: PageProps) {
  const jsonData = await getJsonData(params.id);

  return (
    <div className='mt-8 space-y-4'>
      <h1 className='text-2xl underline font-bold'>{jsonData.name}</h1>
      <CodeMirror
        value={jsonData.content || ''}
        height='400px'
        extensions={[json()]}
        editable={false}
        className='border shadow-sm'
      />
    </div>
  );
}