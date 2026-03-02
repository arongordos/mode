export default async function Home() {
  return (
    <main className="min-h-[calc(100vh-65px)] flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight">
            Issue Tracking{' '}
            <span className="text-purple-600 dark:text-purple-400 block">
              simplified
            </span>
          </h1>
          <p className="text-foreground">
            A minimal and elegant issue tracking tool for teams. Manage your
            projects with ease.
          </p>
        </div>
      </div>
    </main>
  );
}
