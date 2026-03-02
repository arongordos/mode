import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { Button } from './ui/button';
import { SignOutButton } from './SignOutButton';

export async function NavBar() {
  const session = await getSession();

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800">
      <nav className="h-16 flex items-center justify-between px-8">
        <div>
          <Link href="/" className="text-xl font-bold">
            Mode
          </Link>
        </div>

        <div className="flex items-center gap-x-4">
          {!session ? (
            <>
              <Button asChild variant="outline">
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button asChild variant="custom">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="custom">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <SignOutButton />
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
