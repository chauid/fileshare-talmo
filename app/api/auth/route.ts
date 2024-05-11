import { AuthSchema } from '@lib/schemas/auth-schema';
import { comparePassword } from '@lib/server/encryption';
import * as LoginLogModules from '@lib/server/modules/login-log';
import * as UserModules from '@lib/server/modules/user';
import { IResponseDefault } from '@lib/server/response';
import { getAuthSession, getEncryptedSession, ISESSION_AUTH } from '@lib/server/server-session';
import Ajv from 'ajv';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse, userAgent } from 'next/server';

export type TReturnAuthGET = IResponseDefault;

export type TReturnAuthPOST = IResponseDefault & {
  user?: { id: string };
};

export async function GET(request: NextRequest): Promise<NextResponse<TReturnAuthGET>> {
  const { searchParams } = new URL(request.url);
  const session = await getAuthSession();

  if (searchParams.get('action') === 'logout') {
    cookies().delete('user');
    return NextResponse.json({ success: true }, { status: 200 });
  }

  if (session.id) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  return NextResponse.json({ success: false }, { status: 200 });
}

export async function POST(request: NextRequest): Promise<NextResponse<TReturnAuthPOST>> {
  const body = await request.json();

  const validate = new Ajv().compile(AuthSchema);
  if (!validate(body)) {
    return NextResponse.json({ success: false, message: '잘못된 요청.' }, { status: 400 });
  }

  try {
    const user = await UserModules.readUserById(body.id);
    if (!user) {
      return NextResponse.json({ success: false, message: '아이디를 찾을 수 없습니다.' }, { status: 200 });
    }

    if (await comparePassword(body.password, user.password)) {
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

      if (body.id_cookie) {
        cookies().set('user_id', user.id, { sameSite: 'strict', maxAge: 3600 * 24 * 7 }); // 7 Days
      } else {
        cookies().delete('user_id');
      }
      return NextResponse.json({ success: true, message: '인증 성공.', user: { id: user.id } }, { status: 200 });
    }
    return NextResponse.json({ success: false, message: '로그인 정보가 일치하지 않습니다.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Internal Server Error.' }, { status: 500 });
  }
}
