'use client';

import { useEffect, useState } from 'react';

import { TReturnAuthGET } from '@app/api/auth/route';
import useRequest from '@lib/client/use-request';

export interface IUserInfo {
  id?: string;
  email?: string;
  name?: string;
}

export default function useLayout() {
  const [userId, setUserId] = useState<string | undefined>();
  const [userEmail, setUserEmail] = useState<string | undefined>();
  const [userName, setUserName] = useState<string | undefined>();
  const [loadOnce, setLoadOnce] = useState(true);

  const apiUri = '/api/auth';
  const { request, clear, data } = useRequest<TReturnAuthGET>(apiUri);

  useEffect(() => {
    if (loadOnce) {
      request(new FormData(), 'GET');
      setLoadOnce(false);
    }

    if (data) {
      if (data.user) {
        setUserId(data.user.id);
        setUserEmail(data.user.email);
        setUserName(data.user.name);
        clear();
      }
    }

    if (userId) {
      setTimeout(() => {
        request(new FormData(), 'GET', '/api/auth?action=logout');
        alert('세션이 만료되었습니다.');
      }, 1000 * 7200); // 2 Hours
    }
  }, [clear, data, loadOnce, request, userId]);

  return {
    userInfo: { id: userId, email: userEmail, name: userName },
  };
}
