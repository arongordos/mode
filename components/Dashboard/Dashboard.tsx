import { getSession } from '@/lib/auth';
import { getIssues } from '@/lib/dal';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { ISSUE_PRIORITY, ISSUE_STATUS } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export async function Dashboard() {
  const issues = await getIssues();

  const session = await getSession();

  if (!session) {
    redirect('/signin');
  }

  return (
    <>
      {issues.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-700/40 shadow-sm">
          <div className="min-w-xl">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 text-sm font-medium text-foreground bg-neutral-50 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800">
              <div className="col-span-5">Title</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Priority</div>
              <div className="col-span-3">Created</div>
            </div>

            <div className="">
              {issues.map((issue) => (
                <Link
                  key={issue.id}
                  href={`/issues/${issue.id}`}
                  className="block hover:bg-neutral-50 dark:hover:bg-neutral-700/20 transition-colors"
                >
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                    <div className="col-span-5 font-medium truncate">
                      {issue.title}
                    </div>
                    <div className="col-span-2">
                      {
                        <Badge
                          className={`${ISSUE_STATUS[issue.status].className} text-white`}
                        >
                          {ISSUE_STATUS[issue.status].label}
                        </Badge>
                      }
                    </div>
                    <div className="col-span-2">
                      {
                        <Badge
                          className={`${ISSUE_PRIORITY[issue.priority].className} text-white`}
                        >
                          {ISSUE_PRIORITY[issue.priority].label}
                        </Badge>
                      }
                    </div>
                    <div className="col-span-3 text-sm text-foreground">
                      {formatDate(issue.createdAt)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center border border-neutral-200 dark:border-neutral-800 rounded-lg bg-neutral-50 dark:bg-neutral-800 p-8">
          <h3 className="text-lg font-medium mb-2">No issues found</h3>
          <p className="text-muted-foreground">
            Get started by creating your first issue.
          </p>
        </div>
      )}
    </>
  );
}
