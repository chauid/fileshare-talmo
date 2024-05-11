import { PUTProfileSchema } from '@lib/schemas/profile-schema';
import imageUpload from '@lib/server/gcp/image-upload';
import * as UserModules from '@lib/server/modules/user';
import { IResponseDefault } from '@lib/server/response';
import { getAuthSession } from '@lib/server/server-session';
import Ajv from 'ajv';
import { NextRequest, NextResponse } from 'next/server';

export type TReturnUserGET = IResponseDefault & {
  userInfo?: UserModules.TReadUserByIdWithoutPrivate;
};

export type TReturnUserPUT = IResponseDefault;

export async function GET(): Promise<NextResponse<TReturnUserGET>> {
  const session = await getAuthSession();
  if (!session.id) {
    return NextResponse.json({ success: false }, { status: 200 });
  }

  try {
    const userInfo = await UserModules.readUserByIdWithoutPrivate(session.id);

    if (!userInfo || !userInfo.email) {
      return NextResponse.json({ success: true, message: '사용자를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: '사용자 조회 성공.', userInfo }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: true, message: 'Internal Server Error.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse<TReturnUserPUT>> {
  const body = await request.json();

  const validate = new Ajv().compile(PUTProfileSchema);
  if (!validate(body)) {
    return NextResponse.json({ success: false, message: '비정상적인 데이터.' }, { status: 400 });
  }

  // console.log(body);
  await imageUpload(body.file as File, body.profile_image);

  return NextResponse.json({ success: true, message: '회원 정보를 수정하였습니다.' }, { status: 200 });
}
