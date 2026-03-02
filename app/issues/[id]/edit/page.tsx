import { Suspense } from 'react';
import EditIssue from '@/components/EditIssue';
import { Spinner } from '@/components/ui/spinner';

export default async function EditIssuePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Edit Issue</h1>

      <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-sm p-6">
        <Suspense
          fallback={
            <div className="flex justify-center">
              <Spinner className="size-8" />
            </div>
          }
        >
          <EditIssue id={id} />
        </Suspense>
      </div>
    </>
  );
}
