import JsonEditor from '@/components/jsonEditor'
import db from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const user = await currentUser()
  if (!user) redirect('/')

  try {
    // Simple connection test
    await db.$executeRaw`SELECT 1`
    
    const existingUser = await db.user.findUnique({
      where: { clerkUserId: user.id }
    })

    if (!existingUser) {
      await db.user.create({
        data: {
          clerkUserId: user.id,
          name: [user.firstName, user.lastName].filter(Boolean).join(' '),
          email: user.emailAddresses[0]?.emailAddress || '',
          imageUrl: user.imageUrl
        }
      })
    }

    return (
      <div>
        <div className='my-8'>
          <h1 className='text-3xl font-bold'>Dashboard</h1>
          <p className='text-muted-foreground'>
            Manage your data and share it with others.
          </p>
        </div>
        <JsonEditor />
      </div>
    )
  } catch (error) {
    console.error('Database error:', error)
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        <h2 className="font-bold">Service Temporarily Unavailable</h2>
        <p>We're experiencing connection issues. Please try again later.</p>
        {process.env.NODE_ENV === 'development' && (
          <pre className="mt-2 text-xs">{error instanceof Error ? error.message : String(error)}</pre>
        )}
      </div>
    )
  }
}