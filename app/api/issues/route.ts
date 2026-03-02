import db from '@/db';
import { issues } from '@/db/schema';
import { getSession } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import z, { flattenError, ZodError } from 'zod';

const CreateIssueSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string().optional().nullable(),
  status: z
    .enum(['todo', 'in_progress', 'done'], {
      error: () => ({ message: 'Please enter a valid status' }),
    })
    .optional(),
  priority: z
    .enum(['low', 'medium', 'high'], {
      error: () => ({ message: 'Please enter a valid priority' }),
    })
    .optional(),
});

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const issues = await db.query.issues.findMany();
    return NextResponse.json({ data: issues });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error getting issues' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const validatedBody = CreateIssueSchema.parse(data);

    const [newIssue] = await db
      .insert(issues)
      .values({
        userId: session.userId,
        ...validatedBody,
      })
      .returning();
    return NextResponse.json({ data: newIssue }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: 'Verification failed',
          errors: flattenError(error).fieldErrors,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: 'Error creating issue' },
      { status: 500 },
    );
  }
}
