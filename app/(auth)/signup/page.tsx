import { SignUpForm } from '@/components/SignUpForm';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
  const session = await getSession();

  if (session) {
    redirect('/dashboard');
  }

  return <SignUpForm />;
}
