import { Issue } from '@/components/Issue/Issue';
import { Suspense } from 'react';
import IssueLoading from '@/components/Issue/IssueSkeleton';

export default async function IssuePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<IssueLoading />}>
      <Issue id={id} />
    </Suspense>
  );
}
