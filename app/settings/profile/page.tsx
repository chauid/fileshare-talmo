'use client';

import { Dropdown } from 'flowbite-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Loading from '@components/loading';
import useProfile from '@lib/client/hooks/use-profile';
import { dateToString } from '@lib/utils';

export default function Profile() {
  const { userInfo, handleSubmit } = useProfile();
  const [userCreatedAt, setUserCreatedAt] = useState('');

  useEffect(() => {
    if (userInfo) {
      const createdAt = new Date(userInfo.created_at);
      const date = dateToString(createdAt);
      setUserCreatedAt(date);
    }
  }, [userInfo]);

  if (userInfo) {
    return (
      <section>
        <h1 className="text-2xl ">프로필 설정</h1>
        <form onSubmit={handleSubmit}></form>
        <button type="button" className="">
          user: {userInfo.name}
        </button>
        <div className="flex flex-wrap gap-2">
          <Dropdown
            label={
              <Image
                src={userInfo.profile_image}
                alt=""
                width={200}
                height={200}
                className="aspect-square rounded-full"
              />
            }
            arrowIcon={false}
            inline
          >
            <Dropdown.Item>프로필 사진 변경</Dropdown.Item>
            <Dropdown.Item>기본 이미지로 변경</Dropdown.Item>
          </Dropdown>
          <div>
            <p>가입일</p>
            <p>{userCreatedAt}</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <div className="flex h-[calc(100vh_-_22rem)] flex-col items-center justify-center gap-5">
      <Loading size={80} color="#47A7C4" />
      <p>사용자 정보 가져오는 중...</p>
    </div>
  );
}
