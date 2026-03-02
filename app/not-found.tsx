import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-y-2">
      <h1 className="text-5xl font-extrabold">404</h1>
      <p className="text-lg">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button asChild variant="secondary">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
