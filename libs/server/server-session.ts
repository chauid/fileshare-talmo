import { sealData, unsealData } from 'iron-session';
import { cookies } from 'next/headers';

export interface ISESSION_AUTH {
  id: string;
  isAdmin: boolean;
}

/* Authentication */
export async function getAuthSession() {
  const userCookie = cookies().get('user');
  if (userCookie) {
    const userData = await unsealData(userCookie.value, { password: process.env.SESSION_PASSWORD || '' });
    if (userData && typeof userData === 'object') {
      return userData as ISESSION_AUTH;
    }
  }
  return { id: undefined, isAdmin: undefined };
}

export async function getEncryptedSession(auth: ISESSION_AUTH) {
  return sealData(auth, { password: process.env.SESSION_PASSWORD || '' });
}
