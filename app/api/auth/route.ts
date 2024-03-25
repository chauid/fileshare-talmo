import { getAuthSession, setSessionData } from '@lib/server/server-session';

export async function GET(request: Request) {
  const auth = await getAuthSession();
  auth.name = 'test';
  auth.isAdmin = false;
  await auth.save();

  return Response.json({ status: 200, message: 'ok' });
}

export async function POST(request: Request) {
  const aa = request.body;
  console.log(aa);
  return Response.json({ status: 200, message: 'post' });
}
