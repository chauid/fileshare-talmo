import Ajv from 'ajv';
import { NextRequest, NextResponse } from 'next/server';

import { SignUpSchema } from '@lib/schemas/sign-up-schema';
import { getEncryptPassword } from '@lib/server/encryption';
import * as UserModules from '@lib/server/modules/user';
import { IResponseDefault } from '@lib/server/response';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const checkId = searchParams.get('id');
  try {
    if (checkId) {
      const user = await UserModules.findUserById(checkId);
      if (user) {
        return NextResponse.json({ message: '아이디가 중복되었습니다.', check: false }, { status: 200 });
      }
      return NextResponse.json({ message: '아이디 사용 가능', check: true }, { status: 200 });
    }
    return NextResponse.json({ message: '잘못된 요청.', check: false }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error.', success: false }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.formData();
  const form_id = body.get('id')?.toString();
  const form_email = body.get('email')?.toString();
  const form_name = body.get('name')?.toString();
  const form_password = body.get('password')?.toString();
  const form_phone = body.get('phone')?.toString();
  const form_birth = body.get('birth')?.toString();
  const formObject = { id: form_id, email: form_email, name: form_name, password: form_password, phone: form_phone, birth: form_birth };

  const validate = new Ajv().compile(SignUpSchema);
  if (!validate(formObject)) {
    return NextResponse.json({ message: '비정상적인 데이터.', success: false }, { status: 400 });
  }
  formObject.password = await getEncryptPassword(formObject.password);

  try {
    const user = await UserModules.findUserById(formObject.id);
    if (user) {
      return NextResponse.json({ message: '아이디가 중복되었습니다.', success: false }, { status: 400 });
    }

    await UserModules.registerUser(formObject);
    return NextResponse.json({ message: '회원가입이 완료되었습니다.', success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error.', success: false }, { status: 500 });
  }
}

export type TReturnSignUpGET = IResponseDefault & {
  check: boolean;
};

export type TReturnSignUpPOST = IResponseDefault & {
  success: boolean;
};
