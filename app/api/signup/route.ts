import { POSTSignUpSchema, PUTSignUpSchema } from '@lib/schemas/sign-up-schema';
import { getEncryptPassword } from '@lib/server/encryption';
import * as UserModules from '@lib/server/modules/user';
import { IResponseDefault } from '@lib/server/response';
import Ajv from 'ajv';
import { NextRequest, NextResponse } from 'next/server';

export type TReturnSignUpPOST = IResponseDefault;
export type TReturnSignUpPUT = IResponseDefault;

export async function POST(request: NextRequest): Promise<NextResponse<TReturnSignUpPOST>> {
  const body = await request.json();

  const validate = new Ajv().compile(POSTSignUpSchema);
  if (!validate(body)) {
    return NextResponse.json({ success: false, message: '비정상적인 데이터.' }, { status: 400 });
  }

  body.password = await getEncryptPassword(body.password);

  try {
    const user = await UserModules.readUserByIdWithoutPrivate(body.id);
    if (user) {
      return NextResponse.json({ success: false, message: '아이디가 중복되었습니다.' }, { status: 400 });
    }

    await UserModules.createUser(body);
    return NextResponse.json({ success: true, message: '회원가입이 완료되었습니다.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Internal Server Error.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse<TReturnSignUpPUT>> {
  const body = await request.json();

  const validate = new Ajv().compile(PUTSignUpSchema);
  if (!validate(body)) {
    return NextResponse.json({ success: false, message: '비정상적인 데이터.' }, { status: 400 });
  }

  try {
    if (body.id) {
      const user = await UserModules.readUserByIdWithoutPrivate(body.id);
      if (user) {
        return NextResponse.json({ success: false, message: '아이디가 중복되었습니다.' }, { status: 200 });
      }
      return NextResponse.json({ success: true, message: '아이디 사용 가능' }, { status: 200 });
    }
    return NextResponse.json({ success: false, message: '잘못된 요청.' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Internal Server Error.' }, { status: 500 });
  }
}
