'use server';

import db from '@/db';
import { issues } from '@/db/schema';
import { getCurrentUser } from '@/lib/dal';
import { and, eq } from 'drizzle-orm';
import z, { flattenError } from 'zod';

export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
};

const IssueSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string().optional().nullable(),
  status: z.enum(['todo', 'in_progress', 'done'], {
    error: () => ({ message: 'Please select a valid status' }),
  }),
  priority: z.enum(['low', 'medium', 'high'], {
    error: () => ({ message: 'Please select a valid priority' }),
  }),
});

const UpdateIssueSchema = IssueSchema.partial();

export type IssueData = z.infer<typeof IssueSchema>;

export async function createIssue(data: IssueData): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        message: '❌ Unauthorized',
        error: 'Unauthorized',
      };
    }

    const validationResult = IssueSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: flattenError(validationResult.error).fieldErrors,
      };
    }

    const validatedData = validationResult.data;
    await db.insert(issues).values({
      userId: user.id,
      ...validatedData,
    });

    return {
      success: true,
      message: '✅ Issue created successfully',
    };
  } catch (error) {
    console.error('Error creating issue', error);
    return {
      success: false,
      message: 'An error occurred while creating the issue',
      error: 'Failed to create issue',
    };
  }
}

export async function updateIssue(
  id: number,
  data: Partial<IssueData>,
): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        message: '❌ Unauthorized',
        error: 'Unauthorized',
      };
    }

    const validationResult = UpdateIssueSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: flattenError(validationResult.error).fieldErrors,
      };
    }

    const validatedData = validationResult.data;
    await db
      .update(issues)
      .set({ ...validatedData, updatedAt: new Date() })
      .where(and(eq(issues.id, id), eq(issues.userId, user.id)));

    return {
      success: true,
      message: '✅ Issue updated successfully',
    };
  } catch (error) {
    console.error('Error updating issue', error);
    return {
      success: false,
      message: 'An error occurred while updating the issue',
      error: 'Failed to update issue',
    };
  }
}

export async function deleteIssue(id: number): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        message: '❌ Unauthorized',
        error: 'Unauthorized',
      };
    }

    await db
      .delete(issues)
      .where(and(eq(issues.id, id), eq(issues.userId, user.id)));

    return {
      success: true,
      message: '✅ Issue deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting issue', error);
    return {
      success: false,
      message: 'An error occurred while deleting the issue',
      error: 'Failed to delete issue',
    };
  }
}
