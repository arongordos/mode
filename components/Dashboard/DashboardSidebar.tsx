import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { Suspense } from 'react';
import { UserEmail } from '../UserEmail/UserEmail';
import { UserEmailSkeleton } from '../UserEmail/UserEmailSkeleton';

export default async function Navigation() {
  return (
    <aside className="fixed inset-y-0 w-16 md:w-64 backdrop-blur-xs bg-neutral-50/40 dark:bg-neutral-700/40 border-r border-neutral-200 dark:border-r-neutral-800 flex flex-col py-4 px-2 md:px-4">
      <div className="flex items-center justify-center md:justify-start mb-8 px-2">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-foreground"
        >
          <span className="hidden md:inline">Mode</span>
          <span className="md:hidden">M</span>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col items-center space-y-1 md:items-start">
        <Link href="/issues/new" className="flex items-center gap-x-2">
          <PlusIcon />
          <span className="hidden md:inline text-muted-foreground">
            New Issue
          </span>
        </Link>
      </nav>

      <div className="flex flex-col items-center md:items-start pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <Suspense fallback={<UserEmailSkeleton />}>
          <UserEmail />
        </Suspense>
      </div>
    </aside>
  );
}
