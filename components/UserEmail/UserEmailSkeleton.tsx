export function UserEmailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Email */}
      <div className="hidden md:block h-4 w-52 rounded-md bg-neutral-300 dark:bg-neutral-700 mb-2" />

      {/* Sign Out Button */}
      <div className="size-10 md:h-9 md:w-24 rounded-md bg-neutral-300 dark:bg-neutral-700" />
    </div>
  );
}
