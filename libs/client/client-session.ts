'use client';

import { getAuthName, getSessionMsg } from '@lib/server/server-session';

export async function getClientAuth() {
  const userSession = await getAuthName().then((data) => {
    if (data === undefined) {
      return 'no';
    }
    return data;
  });
  return userSession;
}

export async function getClientMsg(cookieName: string) {
  const sessionData = await getSessionMsg(cookieName).then((data) => {
    if (data === undefined) {
      return 'no';
    }
    return data;
  });
  return sessionData;
}
