import NewIssue from '@/components/NewIssue';

export default function NewIssuePage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Create New Issue</h1>

      <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-sm p-6">
        <NewIssue />
      </div>
    </>
  );
}
