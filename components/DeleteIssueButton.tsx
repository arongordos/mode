'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import { deleteIssue } from '@/app/actions/issues';
import { ConfirmDialog } from './ConfirmDialog';

interface DeleteIssueButtonProps {
  id: number;
}

export default function DeleteIssueButton({ id }: DeleteIssueButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const result = await deleteIssue(id);

      if (!result.success) {
        throw new Error('Failed to delete issue');
      }

      router.push('/dashboard');
      return true;
    } catch (error) {
      console.error('Error deleting issue:', error);
      return false;
    }
  };

  return (
    <ConfirmDialog handleDelete={handleDelete}>
      <Button variant="destructive" size="sm">
        <span className="flex items-center">
          <Trash2Icon size={16} className="mr-1" />
          Delete
        </span>
      </Button>
    </ConfirmDialog>
  );
}
