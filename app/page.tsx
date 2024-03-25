'use client';

import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { getClientAuth } from '@lib/client/client-session';

export default function Home() {
  const [userAuth, setUserAuth] = useState<string>('');
  async function getUserAuth() {
    const userSession = await getClientAuth();
    setUserAuth(userSession);
  }
  useEffect(() => {
    getUserAuth();
    setTimeout(() => {
      if (userAuth) {
        if (userAuth !== 'no') {
          // alert(`당신은 로그인 유저~! ${userAuth}`);
        } else {
          // alert('세션이 만료되었습니다. 로그인 페이지로 이동합니다.');
          // window.location.replace('/login');
        }
      }
    }, 500);
  }, [userAuth]);
  function tt() {
    toast.success('asd');
  }
  return (
    <section>
      <div>Test</div>
      <div>안녕하세요</div>
      <div>Hello World~!</div>
      <button type="button" className="">
        Default
      </button>
      <div className="flex flex-wrap gap-2">
        <Button onClick={tt}>Default</Button>
        <Button color="blue">Blue</Button>
        <Button color="gray">Gray</Button>
        <Button color="dark">Dark</Button>
        <Button color="light">Light</Button>
        <Button color="success">Success</Button>
        <Button color="failure">Failure</Button>
        <Button color="warning">Warning</Button>
        <Button color="purple">Purple</Button>
      </div>
    </section>
  );
}
