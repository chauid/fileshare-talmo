import Ajv from 'ajv';
import { NextRequest, NextResponse } from 'next/server';

import { AuthSchema } from '@lib/schemas/auth-schema';
import { comparePassword } from '@lib/server/encryption';
import * as UserModules from '@lib/server/modules/user';
import { IResponseDefault } from '@lib/server/response';
import { getAuthSession } from '@lib/server/server-session';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const currentSession = await getAuthSession();

  if (searchParams.get('action') === 'logout') {
    currentSession.destroy();
    return NextResponse.json({ message: 'Y' }, { status: 200 });
  }

  if (!currentSession.id) {
    return NextResponse.json({ message: 'N' }, { status: 200 });
  }

  try {
    const user = await UserModules.findUserById(currentSession.id);
    if (user) {
      return NextResponse.json({ message: 'Y', user: { id: user.id, email: user.email, name: user.name } }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.formData();
  const body_id = body.get('id')?.toString();
  const body_password = body.get('password')?.toString();
  const body_id_cookie = body.get('id_cookie')?.toString();
  const formObject = { id: body_id, password: body_password, id_cookie: body_id_cookie === 'true' };

  const validate = new Ajv().compile(AuthSchema);
  if (!validate(formObject)) {
    return NextResponse.json({ message: '잘못된 요청.' }, { status: 400 });
  }

  try {
    const user = await UserModules.findUserById(formObject.id);
    if (!user) {
      return NextResponse.json({ message: '아이디를 찾을 수 없습니다.' }, { status: 200 });
    }

    if (await comparePassword(formObject.password, user.password)) {
      const auth = await getAuthSession();
      auth.id = user.id;
      if (user.is_admin) {
        auth.isAdmin = true;
      } else {
        auth.isAdmin = false;
      }
      await auth.save();
      return NextResponse.json(
        { message: '인증 성공.', user: { id: user.id, email: user.email, name: user.name, id_cookie: formObject.id_cookie } },
        { status: 200 },
      );
    }
    return NextResponse.json({ message: '로그인 정보가 일치하지 않습니다.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error.' }, { status: 500 });
  }
}

export type TReturnAuthGET = IResponseDefault & {
  user?: { id: string; email: string; name: string };
};

export type TReturnAuthPOST = IResponseDefault & {
  user?: { id: string; email: string; name: string; id_cookie: boolean };
};
