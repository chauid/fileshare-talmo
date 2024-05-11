'use client';

import { useEffect, useState } from 'react';

import { TReturnUserGET } from '@app/api/user/route';
import { useGET } from '@lib/client/use-request';

export interface IUserInfo {
  id?: string;
  email?: string;
  name?: string;
}

export default function useLayout() {
  const [userId, setUserId] = useState<string | undefined>();
  const [userEmail, setUserEmail] = useState<string | undefined | null>();
  const [userName, setUserName] = useState<string | undefined>();
  const [userImage, setUserImage] = useState<string | undefined>();
  const [loadOnce, setLoadOnce] = useState(true);

  const apiUri = '/api/user';
  const { request, clear, data } = useGET<TReturnUserGET>(apiUri);

  useEffect(() => {
    if (loadOnce) {
      request();
      setLoadOnce(false);
    }

    if (data) {
      if (data.userInfo) {
        setUserId(data.userInfo.id);
        setUserEmail(data.userInfo.email);
        setUserName(data.userInfo.name);
        setUserImage(data.userInfo.profile_image);
        clear();
      }
    }

    if (userId) {
      setTimeout(() => {
        request(`${apiUri}?action=logout`);
        alert('세션이 만료되었습니다.');
        window.location.href = '/login';
      }, 1000 * 3600 * 2); // 2 Hours
    }
  }, [clear, data, loadOnce, request, userId]);

  return {
    userInfo: { id: userId, email: userEmail, name: userName },
  };
}
