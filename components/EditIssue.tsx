import { getSession } from '@/lib/auth';
import { notFound, redirect } from 'next/navigation';
import IssueForm from '@/components/IssueForm';
import { canEditIssue, getIssue } from '@/lib/dal';

export default async function EditIssue({ id }: { id: string }) {
  const session = await getSession();

  if (!session) {
    redirect('/signin');
  }

  if (!Number.isInteger(+id)) {
    notFound();
  }

  const issue = await getIssue(+id);

  if (!issue) {
    notFound();
  }

  const canEdit = await canEditIssue(+id, session.userId);

  if (!session) {
    redirect('/signin');
  }
  return canEdit ? (
    <IssueForm isEditing={true} issue={issue} />
  ) : (
    <p>You don&apos;t have the permission to edit this issue.</p>
  );
}
