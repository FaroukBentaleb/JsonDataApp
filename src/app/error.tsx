'use client'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try again
      </button>
      <details className="mt-4">
        <summary className="cursor-pointer text-sm text-gray-600">Error details</summary>
        <pre className="mt-2 p-2 bg-gray-100 rounded text-red-500 overflow-auto">
          {error.message}
        </pre>
      </details>
    </div>
  )
}