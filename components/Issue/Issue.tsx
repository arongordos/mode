import { getSession } from '@/lib/auth';
import { canEditIssue, getIssue } from '@/lib/dal';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Button } from '../ui/button';
import { Calendar, Clock, Edit2Icon, User } from 'lucide-react';
import DeleteIssueButton from '../DeleteIssueButton';
import { Badge } from '../ui/badge';
import { ISSUE_PRIORITY, ISSUE_STATUS } from '@/lib/types';

import { formatDate, formatRelativeTime } from '@/lib/utils';

export async function Issue({ id }: { id: string }) {
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

  const { title, description, createdAt, updatedAt, user } = issue;

  const canEdit = await canEditIssue(+id, session.userId);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        {canEdit && (
          <div className="flex items-center space-x-2">
            <Link href={`/issues/${id}/edit`}>
              <Button variant="outline" size="sm">
                <span className="flex items-center">
                  <Edit2Icon size={16} className="mr-1" />
                  Edit
                </span>
              </Button>
            </Link>
            <DeleteIssueButton id={Number(id)} />
          </div>
        )}
      </div>

      <div className="mt-8 overflow-x-auto bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-sm p-6 mb-8">
        <div className="min-w-xl flex flex-wrap gap-3 mb-6">
          <Badge
            className={`${ISSUE_STATUS[issue.status].className} text-white`}
          >
            {ISSUE_STATUS[issue.status].label}
          </Badge>
          <Badge
            className={`${ISSUE_PRIORITY[issue.priority].className} text-white`}
          >
            {ISSUE_PRIORITY[issue.priority].label}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground gap-x-3">
            <div className="flex items-center gap-x-1" title="Created At">
              <Calendar size={15} />
              <span>{formatDate(createdAt)}</span>
            </div>
            <div className="flex items-center gap-x-1" title="Updated At">
              <Clock size={15} />
              <span>{formatRelativeTime(updatedAt)}</span>
            </div>
            <div className="flex items-center gap-x-1" title="Author">
              <User size={15} />
              <span>{user.email}</span>
            </div>
          </div>
        </div>

        {description ? (
          <p>{description}</p>
        ) : (
          <p className="text-muted-foreground italic">
            No description provided.
          </p>
        )}
      </div>
    </>
  );
}
