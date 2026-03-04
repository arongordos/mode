import { SignUpForm } from '@/components/SignUpForm';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function SignUpPage() {
  const session = await getSession();

  if (session) {
    redirect('/dashboard');
  }

  return <SignUpForm />;
}
