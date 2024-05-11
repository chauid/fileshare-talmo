'use client';

import { useEffect } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import { TReturnUserGET } from '@app/api/user/route';
import { useRequest } from '@lib/client/use-request';
import { IProfileSchema } from '@lib/schemas/profile-schema';
import { objectToFormData } from '@lib/utils';

export default function useProfile() {
  const apiUri = '/api/user';
  const profileForm = useForm<IProfileSchema>();
  const { data: getData } = useSWR<TReturnUserGET>(apiUri);
  const { request, clear, data: putData, isLoading: putIsLoading } = useRequest(apiUri);

  useEffect(() => {
    if (putData) {
      toast.success('회원 정보가 수정되었습니다.');
    }
  }, [putData]);

  async function onValid(form: IProfileSchema) {
    if (profileForm.getValues('birth') === undefined) {
      toast.error('생년월일을 입력해주세요.');
      return;
    }
    if (putIsLoading) {
      return;
    }

    const reqForm = objectToFormData(form);

    clear();
    request(reqForm, 'POST');
  }

  async function onInvlalid(errors: FieldErrors<IProfileSchema>) {
    const [error] = Object.values(errors);
    if (error && error.message) {
      toast.error(error.message);
    }
  }

  return {
    userInfo: getData?.userInfo,
    handleSubmit: profileForm.handleSubmit(onValid, onInvlalid),
  };
}
