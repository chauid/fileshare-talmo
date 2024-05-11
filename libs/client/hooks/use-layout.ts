'use client';

import { TReturnUserGET } from '@app/api/user/route';
import { useEffect, useState } from 'react';
import useSWRImmutable from 'swr/immutable';

export interface IUserInfo {
  id: string | undefined;
  email: string | null | undefined;
  name: string | undefined;
  profile_image: string | undefined;
}

export default function useLayout() {
  const [userId, setUserId] = useState<string | undefined>();
  const [userEmail, setUserEmail] = useState<string | undefined | null>();
  const [userName, setUserName] = useState<string | undefined>();
  const [userImage, setUserImage] = useState<string | undefined>();

  const apiUri = '/api/user';
  const { data } = useSWRImmutable<TReturnUserGET>(apiUri);

  useEffect(() => {
    if (data) {
      if (data.userInfo) {
        setUserId(data.userInfo.id);
        setUserEmail(data.userInfo.email);
        setUserName(data.userInfo.name);
        setUserImage(data.userInfo.profile_image);
      }
    }

    if (userId) {
      setTimeout(
        async () => {
          await fetch(`${apiUri}?action=logout`, { method: 'GET' });
          alert('세션이 만료되었습니다.');
          window.location.href = '/login';
        },
        1000 * 3600 * 2,
      ); // 2 Hours
    }
  }, [data, userId]);

  return { userInfo: { id: userId, email: userEmail, name: userName, profile_image: userImage } };
}
