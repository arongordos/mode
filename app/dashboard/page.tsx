import { Dashboard } from '@/components/Dashboard/Dashboard';
import { DashboardSkeleton } from '@/components/Dashboard/DashboardSkeleton';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function DashboardPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Issues</h1>

        <Button asChild variant="custom">
          <Link href="/issues/new">
            <PlusIcon size={18} />
            New Issue
          </Link>
        </Button>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard />
      </Suspense>
    </>
  );
}
