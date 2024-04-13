'use client';

import { useEffect } from 'react';
import { Triangle } from 'react-loader-spinner';

import { TReturnAuthGET } from '@app/api/auth/route';
import useRequest from '@lib/client/use-request';

export default function Logout() {
  const { data, request } = useRequest<TReturnAuthGET>('/api/auth?action=logout');
  useEffect(() => {
    request(new FormData(), 'GET');

    if (data) {
      if (data.message === 'Y') {
        window.location.href = '/';
      }
    }
  });
  return (
    <div className="flex h-[calc(100vh_-_22rem)] flex-col items-center justify-center gap-5">
      <Triangle visible={true} height="80" width="80" color="#47A7C4" ariaLabel="triangle-loading" />
      <p>로그아웃 중...</p>
    </div>
  );
}
