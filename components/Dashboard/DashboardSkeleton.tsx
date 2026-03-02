export function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Table */}
      <div className="bg-white -mt-1 dark:bg-neutral-700/40 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
          <div className="col-span-5 w-14 h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
          <div className="col-span-2 w-16 h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
          <div className="col-span-2 w-16 h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
          <div className="col-span-3 w-20 h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
        </div>

        {/* Rows */}
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          <div className="grid grid-cols-12 gap-4 px-6 py-5 items-center">
            <div className="col-span-5 h-5 bg-neutral-300 dark:bg-neutral-700 rounded-md" />
            <div className="col-span-2 h-5 w-20 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
            <div className="col-span-2 h-5 w-14 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
            <div className="col-span-3 h-5 w-32 bg-neutral-300 dark:bg-neutral-700 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
