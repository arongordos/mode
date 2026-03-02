'use client';

import { type ActionResponse, signUp } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Spinner } from './ui/spinner';

const initialState: ActionResponse = {
  success: false,
  message: '',
};

export function SignUpForm() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    try {
      const result = await signUp(formData);
      if (result.success) {
        router.push('/dashboard');
      }
      return result;
    } catch {
      return {
        success: false,
        message: 'An error occurred',
      };
    }
  }, initialState);

  return (
    <div className="min-h-screen flex flex-col justify-center px-4">
      <h1 className="text-center text-3xl font-extrabold text-foreground">
        Mode
      </h1>
      <h2 className="mt-2 text-center text-2xl font-bold">
        Create a new account
      </h2>

      <div className="mt-8 bg-neutral-50 dark:bg-neutral-800 rounded-lg mx-auto w-full max-w-md p-10">
        <form action={formAction} className="space-y-6">
          {state.error && !state.success && (
            <p className="text-center text-red-400">{state.message}</p>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              aria-invalid={state.errors?.email ? 'true' : 'false'}
            />
            {state.errors?.email && (
              <span className="text-sm text-red-400">
                {state.errors.email[0]}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              aria-invalid={state.errors?.password ? 'true' : 'false'}
            />
            {state.errors?.password && (
              <span className="text-sm text-red-400">
                {state.errors.password[0]}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              aria-invalid={state.errors?.confirmPassword ? 'true' : 'false'}
            />
            {state.errors?.confirmPassword && (
              <span className="text-sm text-red-400">
                {state.errors.confirmPassword[0]}
              </span>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <span className="flex items-center gap-x-2">
                <Spinner /> Signing up...
              </span>
            ) : (
              <span>Sign Up</span>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/signin" className="text-foreground hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
