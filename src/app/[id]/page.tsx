import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { JsonData } from '@prisma/client';

// Correct type for Next.js 14+ App Router
type PageProps = {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
};

async function getJsonData(id: string): Promise<JsonData> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.endsWith('/')
    ? process.env.NEXT_PUBLIC_BASE_URL.slice(0, -1)
    : process.env.NEXT_PUBLIC_BASE_URL;
  
  const response = await fetch(`${baseUrl}/api/json/${id}`, {
    cache: 'no-store' // Important for dynamic data
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  
  return response.json();
}

export default async function SharedJson({ params }: PageProps) {
  let jsonData: JsonData;
  
  try {
    jsonData = await getJsonData(params.id);
  } catch (error) {
    console.error('Fetch error:', error);
    return <div className="text-red-500">Error loading JSON data</div>;
  }

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