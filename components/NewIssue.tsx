import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import IssueForm from '@/components/IssueForm';

export default async function NewIssue() {
  const session = await getSession();

  if (!session) {
    redirect('/signin');
  }
  return <IssueForm />;
}
