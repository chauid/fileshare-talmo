'use client';

import { useEffect, useState } from 'react';

import { getClientAuth } from '@lib/client/client-session';

export default function Profile() {
  const [userAuth, setUserAuth] = useState<string>('');
  async function getUserAuth() {
    const userSession = await getClientAuth();
    setUserAuth(userSession);
  }
  useEffect(() => {
    getUserAuth();
  });
  return (
    <section>
      <div>Profile</div>
      <button type="button" className="">
        user: {userAuth}
      </button>
      <div className="flex flex-wrap gap-2"></div>
    </section>
  );
}
