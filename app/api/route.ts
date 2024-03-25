import { getAuthSession } from '@lib/server/server-session';

/* eslint-disable import/prefer-default-export */
export async function GET(request: Request) {
  const session = await getAuthSession();
  session.name = 'Alison';
  session.isAdmin = false;
  await session.save();

  return Response.json({ status: 200, message: 'session test' });
}
