import { UserIcon } from 'lucide-react';
import { SignOutButton } from '@/components/SignOutButton';
import { getCurrentUser } from '@/lib/dal';

export async function UserEmail() {
  const user = await getCurrentUser();

  return (
    <>
      <div className="mb-2">
        <p className="gap-x-2 hidden md:flex">
          <UserIcon className="text-muted-foreground" />
          <span className="text-muted-foreground">{user?.email}</span>
        </p>
      </div>
      <SignOutButton />
    </>
  );
}
