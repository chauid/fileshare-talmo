'use client';

import InputDropZone from '@components/inputs/input-dropzone';
import Loading from '@components/loading';
import useProfile from '@lib/client/hooks/use-profile';
import { dateToString, localeDateToKR } from '@lib/utils';
import { Button, Datepicker, Textarea, TextInput } from 'flowbite-react';
import { ChangeEvent, useEffect, useState } from 'react';

export default function Profile() {
  const { userInfo, profileForm, handleSubmit, handleOnChangeImage } = useProfile();
  const [userCreatedAt, setUserCreatedAt] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (userInfo) {
      const createdAt = new Date(userInfo.created_at);
      const date = dateToString(createdAt);
      setUserCreatedAt(date);
      setSelectedImage(userInfo.profile_image);
    }
  }, [profileForm, userInfo]);

  const see = profileForm.watch('profile_image');

  function handleOnchangeProfileImage(event: ChangeEvent<HTMLInputElement>) {
    const inputFiles = event.target.files;
    if (inputFiles && inputFiles[0]) {
      const url = URL.createObjectURL(inputFiles[0]);
      setSelectedImage(url);
      console.log(url);
      handleOnChangeImage(inputFiles[0]);
    }
  }

  function handleOnSelectedDateChanged(event: Date) {
    profileForm.setValue('birth', localeDateToKR(event).toISOString());
  }

  if (userInfo) {
    return (
      <section>
        <h1 className="text-2xl ">프로필 설정</h1>
        <button onClick={() => console.log(see)}>DD</button>
        <form className="flex max-w-[40rem] flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-end">
            <InputDropZone src={selectedImage} alt="프로필 이미지" onChange={handleOnchangeProfileImage} className="h-96 w-96 rounded-full" />
            <div className="flex gap-2 whitespace-nowrap">
              <div>
                <p>가입일</p>
                <p>{userCreatedAt}</p>
              </div>
            </div>
          </div>
          <p>user: {userInfo.name}</p>
          <TextInput
            type="text"
            placeholder="이메일"
            {...profileForm.register('email', { required: { value: true, message: '이메일을 입력해주세요.' } })}
          />
          <TextInput
            type="tel"
            placeholder="전화번호"
            {...profileForm.register('phone', { required: { value: true, message: '전화번호를 입력해주세요.' } })}
          />
          <Datepicker onSelectedDateChanged={handleOnSelectedDateChanged} />
          <Textarea rows={4} placeholder="본인을 간단히 소개해주세요." {...profileForm.register('description')} />
          <div className="flex flex-row-reverse">
            <Button type="submit">수정</Button>
          </div>
        </form>
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
