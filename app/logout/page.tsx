'use client';

import { TReturnAuthGET } from '@app/api/auth/route';
import Loading from '@components/loading';
import { useEffect } from 'react';
import useSWRImmutable from 'swr/immutable';

export default function Logout() {
  const { data } = useSWRImmutable<TReturnAuthGET>('/api/auth?action=logout');
  useEffect(() => {
    if (data && data.success) {
      window.location.href = '/';
    }
  }, [data]);
  return (
    <div className="flex h-[calc(100vh_-_22rem)] flex-col items-center justify-center gap-5">
      <Loading size={80} color="#47A7C4" />
      <p>로그아웃 중...</p>
    </div>
  );
}
