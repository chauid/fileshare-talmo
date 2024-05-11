import { NextRequest, NextResponse } from 'next/server';

import * as UserModules from '@lib/server/modules/user';
import { IResponseDefault } from '@lib/server/response';
import { getAuthSession } from '@lib/server/server-session';

export async function GET() {
  const session = await getAuthSession();
  if (!session.id) {
    return NextResponse.json({ message: 'N' }, { status: 200 });
  }

  try {
    const userInfo = await UserModules.readUserByIdWithoutPrivate(session.id);

    if (!userInfo || !userInfo.email) {
      return NextResponse.json({ message: '사용자를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json({ message: '사용자 조회 성공.', userInfo }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) { return NextResponse.json({}, { status: 200 }); }

export async function POST(request: NextRequest) { return NextResponse.json({}, { status: 200 }); }

export type TReturnUserGET = IResponseDefault & {
  userInfo?: UserModules.TReadUserByIdWithoutPrivate;
};
