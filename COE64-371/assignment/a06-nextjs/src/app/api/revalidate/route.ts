import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const path = body.path || '/';

    revalidatePath(path);

    return NextResponse.json({ revalidated: true, now: Date.now(), path });
  } catch (error) {
    return NextResponse.json({ revalidated: false, error: (error as Error).message }, { status: 500 });
  }
}
