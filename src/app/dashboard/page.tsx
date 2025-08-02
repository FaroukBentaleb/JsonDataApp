'use client' // Add this if using client-side interactivity

import JsonEditor from '@/components/jsonEditor';
import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const user = await currentUser();
        if (!user) {
          redirect('/');
          return;
        }

        // Check/create user in database
        const loggedInUser = await prisma.user.findUnique({
          where: { clerkUserId: user.id },
        });

        if (!loggedInUser) {
          await prisma.user.create({
            data: {
              clerkUserId: user.id,
              name: `${user.firstName} ${user.lastName}`,
              imageUrl: user.imageUrl,
              email: user.emailAddresses[0]?.emailAddress || '',
            },
          });
        }
      } catch (err) {
        console.error('Initialization error:', err);
        setError('Failed to initialize dashboard');
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
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
  );
}