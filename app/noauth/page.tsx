'use client';

import { Button } from 'flowbite-react';

export default function NoAuth() {
  function pageLogin() {
    window.location.href = '/login';
  }
  return (
    <div className="flex h-[calc(100vh_-_22rem)] flex-col items-center justify-center gap-8">
      <h1 className="text-2xl font-bold">세션이 만료되었거나, 접근 권한이 없습니다.</h1>
      <div className='max-w-[25rem]'>
        <p>
        현재 유효한 자격증명이 없습니다.<br />
        로그인 후 다시 시도해 주세요.
        </p>
      </div>
      <Button color='indigo' onClick={pageLogin}>로그인 하러 가기</Button>
    </div>
  );
}
