import db from '@/db';
import { issues } from '@/db/schema';
import { getSession } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const issue = await db.query.issues.findFirst({
      where: eq(issues.id, +id),
    });

    return NextResponse.json({ data: issue });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error getting issue' }, { status: 500 });
  }
}
