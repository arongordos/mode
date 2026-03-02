'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { Issue } from '@/db/schema';
import { Button } from '@/components/ui/button';

import {
  createIssue,
  updateIssue,
  type ActionResponse,
} from '@/app/actions/issues';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import { ISSUE_PRIORITY, ISSUE_STATUS } from '@/lib/types';
import { Spinner } from './ui/spinner';

interface IssueFormProps {
  issue?: Issue;
  isEditing?: boolean;
}

const initialState: ActionResponse = {
  success: false,
  message: '',
};

export default function IssueForm({
  issue,
  isEditing = false,
}: IssueFormProps) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      status: formData.get('status') as 'todo' | 'in_progress' | 'done',
      priority: formData.get('priority') as 'low' | 'medium' | 'high',
    };

    try {
      const result = isEditing
        ? await updateIssue(Number(issue!.id), data)
        : await createIssue(data);

      if (result.success) {
        if (!isEditing) {
          router.push('/dashboard');
        } else {
          router.push(`/issues/${issue?.id}`);
        }
      }

      return result;
    } catch {
      return {
        success: false,
        message: 'An error occurred',
        errors: undefined,
      };
    }
  }, initialState);

  const statusOptions = Object.values(ISSUE_STATUS).map(({ label, value }) => ({
    label,
    value,
  }));

  const priorityOptions = Object.values(ISSUE_PRIORITY).map(
    ({ label, value }) => ({
      label,
      value,
    }),
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Issue title"
          defaultValue={issue?.title || ''}
          required
          minLength={3}
          maxLength={100}
          disabled={isPending}
          aria-invalid={state.errors?.title ? 'true' : 'false'}
        />
        {state?.errors?.title && (
          <p id="title-error" className="text-sm text-red-400">
            {state.errors.title[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe the issue..."
          defaultValue={issue?.description || ''}
          disabled={isPending}
          aria-invalid={state.errors?.description ? 'true' : 'false'}
          className="h-40 resize-none"
        />
        {state?.errors?.description && (
          <p id="description-error" className="text-sm text-red-400">
            {state.errors.description[0]}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            name="status"
            defaultValue={issue?.status || 'todo'}
            required
            disabled={isPending}
          >
            <SelectTrigger
              id="status"
              className="w-full"
              aria-invalid={state.errors?.status ? 'true' : 'false'}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="dark:bg-neutral-800">
              <SelectGroup>
                {statusOptions.map((statusOption) => (
                  <SelectItem
                    key={statusOption.value}
                    value={statusOption.value}
                    className="dark:hover:bg-neutral-700"
                  >
                    {statusOption.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {state?.errors?.status && (
            <p id="status-error" className="text-sm text-red-400">
              {state.errors.status[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select
            name="priority"
            defaultValue={issue?.priority || 'medium'}
            required
            disabled={isPending}
          >
            <SelectTrigger
              id="priority"
              className="w-full"
              aria-invalid={state.errors?.priority ? 'true' : 'false'}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="dark:bg-neutral-800">
              <SelectGroup>
                {priorityOptions.map((priorityOption) => (
                  <SelectItem
                    key={priorityOption.value}
                    value={priorityOption.value}
                    className="dark:hover:bg-neutral-700"
                  >
                    {priorityOption.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {state?.errors?.priority && (
            <p id="priority-error" className="text-sm text-red-400">
              {state.errors.priority[0]}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} className="w-32">
          <div className="flex items-center gap-x-1">
            {isPending && <Spinner />}
            <span>{isEditing ? 'Update Issue' : 'Create Issue'}</span>
          </div>
        </Button>
      </div>
    </form>
  );
}
