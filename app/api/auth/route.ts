import Ajv from 'ajv';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse, userAgent } from 'next/server';

import { AuthSchema } from '@lib/schemas/auth-schema';
import { comparePassword } from '@lib/server/encryption';
import * as LoginLogModules from '@lib/server/modules/login-log';
import * as UserModules from '@lib/server/modules/user';
import { IResponseDefault } from '@lib/server/response';
import { getAuthSession, getEncryptedSession, ISESSION_AUTH } from '@lib/server/server-session';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const session = await getAuthSession();

  if (searchParams.get('action') === 'logout') {
    cookies().delete('user');
    return NextResponse.json({ message: 'Y' }, { status: 200 });
  }

  if (session.id) {
    return NextResponse.json({ message: 'Y' }, { status: 200 });
  }

  return NextResponse.json({ message: 'N' }, { status: 200 });
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
    const user = await UserModules.readUserById(formObject.id);
    if (!user) {
      return NextResponse.json({ message: '아이디를 찾을 수 없습니다.' }, { status: 200 });
    }

    if (await comparePassword(formObject.password, user.password)) {
      let agentlog = '';
      const agent = userAgent(request);
      agentlog += `${agent.browser.name} ${agent.browser.version}`;
      agentlog += `/${agent.os.name} ${agent.os.version}`;
      if (agent.device.model) {
        agentlog += `/${agent.device.model} ${agent.device.type}`;
      }
      if (agent.cpu.architecture) {
        agentlog += `/${agent.cpu.architecture}`;
      }
      LoginLogModules.createLog(user.id, agentlog);

      const authData: ISESSION_AUTH = { id: '', isAdmin: false };
      authData.id = user.id;
      if (user.is_admin) {
        authData.isAdmin = true;
      } else {
        authData.isAdmin = false;
      }
      const sessionValue = await getEncryptedSession(authData);
      cookies().set('user', sessionValue, { sameSite: 'strict', httpOnly: true });

      if (formObject.id_cookie) {
        cookies().set('user_id', user.id, { sameSite: 'strict', maxAge: 3600 * 24 * 7 }); // 7 Days
      } else {
        cookies().delete('user_id');
      }
      return NextResponse.json({ message: '인증 성공.', user: { id: user.id } }, { status: 200 });
    }
    return NextResponse.json({ message: '로그인 정보가 일치하지 않습니다.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error.' }, { status: 500 });
  }
}

export type TReturnAuthGET = IResponseDefault;

export type TReturnAuthPOST = IResponseDefault & {
  user?: { id: string };
};
