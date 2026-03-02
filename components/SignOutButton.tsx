'use client';

import { signOut } from '@/app/actions/auth';
import { useTransition } from 'react';
import { Button } from './ui/button';
import { LogOutIcon } from 'lucide-react';

export function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  function handleSignOut() {
    startTransition(async () => {
      await signOut();
    });
  }

  return (
    <Button variant="outline" disabled={isPending} onClick={handleSignOut}>
      <LogOutIcon />
      <span className="hidden md:inline">
        {isPending ? 'Signing out...' : 'Sign Out'}
      </span>
    </Button>
  );
}
