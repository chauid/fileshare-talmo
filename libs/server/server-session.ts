'use server';

import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface ISESSION_AUTH {
  id: string;
  isAdmin: boolean;
}

interface ISESSION_DATA {
  message?: string;
}

interface ISESSION_DATA_OPTION {
  cookieName: string;
  message: string;
  ttl?: number;
}

const AUTH_OPTION = {
  cookieName: 'user',
  ttl: 86400 * 2, // 2 Days
  password: process.env.SESSION_PASSWORD || '',
};

const DATA_OPTION = {
  ttl: 86400 * 2, // 2 Days
  password: process.env.SESSION_PASSWORD || '',
};

/* Authentication */
export async function getAuthSession() {
  return getIronSession<ISESSION_AUTH>(cookies(), AUTH_OPTION);
}

/* Session Data */
export async function getSessionData(cookieName: string) {
  const session = await getIronSession<ISESSION_DATA>(cookies(), { password: process.env.SESSION_PASSWORD || '', cookieName });
  return session.message;
}

export async function setSessionData({ cookieName, message, ttl }: ISESSION_DATA_OPTION) {
  const dataOption = Object.assign(DATA_OPTION, { cookieName });
  if (ttl) {
    dataOption.ttl = ttl;
  }

  const session = await getIronSession<ISESSION_DATA>(cookies(), dataOption);
  session.message = message;
  await session.save();
}

export async function destorySessionData(cookieName:string) {
  const session = await getIronSession(cookies(), { cookieName, password: process.env.SESSION_PASSWORD || '' });
  session.destroy();
}
