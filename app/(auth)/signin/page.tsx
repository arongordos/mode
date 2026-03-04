import SignInForm from '@/components/SignInForm';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function SignInPage() {
  const session = await getSession();

  if (session) {
    redirect('/dashboard');
  }

  return <SignInForm />;
}
