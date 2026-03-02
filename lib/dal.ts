import { getSession } from '@/lib/auth';
import db from '@/db';
import { issues, users } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { cache } from 'react';

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  if (!session) return null;

  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId));

    return result[0] || null;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    throw new Error('Failed to get user');
  }
});

export async function getUserByEmail(email: string) {
  try {
    const result = await db.select().from(users).where(eq(users.email, email));

    return result[0] || null;
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw new Error('Failed to get user');
  }
}

export async function getIssues() {
  try {
    const result = await db
      .select()
      .from(issues)
      .orderBy(desc(issues.createdAt));

    return result;
  } catch (error) {
    console.error(`Error fetching issues:`, error);
    throw new Error('Failed to fetch issues');
  }
}

export async function getIssue(id: number) {
  try {
    const result = await db.query.issues.findFirst({
      where: eq(issues.id, id),
      with: {
        user: {
          columns: {
            email: true,
          },
        },
      },
    });

    return result;
  } catch (error) {
    console.error(`Error fetching issue ${id}:`, error);
    throw new Error('Failed to fetch issue');
  }
}

export async function canEditIssue(
  issueId: number,
  loggedInUserId: string,
): Promise<boolean | null> {
  const result = await db
    .select({
      userId: issues.userId,
    })
    .from(issues)
    .where(eq(issues.id, issueId));

  if (result.length === 0) {
    return null;
  }

  return result[0].userId === loggedInUserId;
}
