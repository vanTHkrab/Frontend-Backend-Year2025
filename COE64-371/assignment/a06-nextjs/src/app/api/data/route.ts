import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    timestamp: new Date().toISOString(),
    message: "Hello from Next.js API!",
  };

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 's-maxage=10, stale-while-revalidate=59',
    },
  });
}
