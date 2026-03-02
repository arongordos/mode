export default function IssueLoading() {
  return (
    <div className="max-w-4xl mx-auto pt-2 animate-pulse">
      {/* Title */}
      <div className="h-7 w-full mb-8 bg-neutral-200 dark:bg-neutral-700 rounded-md" />

      {/* Card */}
      <div className="overflow-x-auto bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-sm p-6 mb-8">
        {/* Badges + Text */}
        <div className="min-w-xl flex flex-wrap gap-3 mb-6 items-center">
          <div className="h-5 w-20 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
          <div className="h-5 w-20 bg-neutral-200 dark:bg-neutral-700 rounded-full" />

          <div className="flex items-center gap-x-3 ml-2">
            <div className="h-4 w-28 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
            <div className="h-4 w-28 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
            <div className="h-4 w-40 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-700 rounded-md" />
          <div className="h-4 w-11/12 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
          <div className="h-4 w-10/12 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
          <div className="h-4 w-8/12 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
        </div>
      </div>
    </div>
  );
}
