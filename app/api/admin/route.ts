import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({}, { status: 200 });
}
export async function POST(request: Request) {
  return NextResponse.json({}, { status: 200 });
}
