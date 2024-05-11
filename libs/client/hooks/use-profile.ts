'use client';

import { TReturnUserGET, TReturnUserPUT } from '@app/api/user/route';
import useMutation from '@lib/client/use-mutation';
import { IPUTProfileSchema } from '@lib/schemas/profile-schema';
import { useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWRImmutable from 'swr/immutable';

export default function useProfile() {
  const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>();
  const [im, setim] = useState<File>();
  const a: any = { a: 'asd' };

  const apiUri = '/api/user';
  const profileForm = useForm<IPUTProfileSchema>({
    defaultValues: {
      email: '',
      name: '',
      phone: '',
      birth: '',
      description: '',
    },
  });
  const { data: getData } = useSWRImmutable<TReturnUserGET>(apiUri);
  const { request, clear, data: putData, isLoading: putIsLoading } = useMutation<TReturnUserPUT>(apiUri);

  useEffect(() => {
    if (getData && getData.userInfo) {
      profileForm.setValue('name', getData.userInfo.name);
      profileForm.setValue('email', getData.userInfo.email);
      profileForm.setValue('phone', getData.userInfo.phone);
      profileForm.setValue('birth', getData.userInfo.birth.toString());
      profileForm.setValue('profile_image', getData.userInfo.profile_image);
      profileForm.setValue('description', getData.userInfo.description);
    }
    if (putData) {
      toast.success('회원 정보가 수정되었습니다.');
    }
  }, [getData, profileForm, putData]);

  function handleOnChangeImage(file: File) {
    const reader = new FileReader();
    if (file) {
      setim(file);
      console.log('file: ', file);
      const url = URL.createObjectURL(file);
      profileForm.setValue('profile_image', url);
      reader.onload = (e) => {
        if (e.target) {
          setProfileImage(e.target.result);
          // console.log(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  async function onValid(form: IPUTProfileSchema) {
    if (profileForm.getValues('birth') === undefined) {
      toast.error('생년월일을 입력해주세요.');
      return;
    }
    if (putIsLoading) {
      return;
    }

    form.file = im as object;

    clear();
    request(form, 'PUT');
  }

  async function onInvalid(errors: FieldErrors<IPUTProfileSchema>) {
    const [error] = Object.values(errors);
    if (error && error.message) {
      toast.error(error.message);
    }
  }

  return {
    userInfo: getData?.userInfo,
    profileForm,
    handleSubmit: profileForm.handleSubmit(onValid, onInvalid),
    handleOnChangeImage,
  };
}
