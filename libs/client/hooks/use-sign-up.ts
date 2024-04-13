'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { TReturnSignUpGET, TReturnSignUpPOST } from '@app/api/signup/route';
import useRequest from '@lib/client/use-request';
import { ISignUpSchema } from '@lib/schemas/sign-up-schema';
import { ObjectToFormData } from '@lib/utils';

export type FormValidateType = 'available' | 'error' | 'writing';

export default function useSignUp() {
  const router = useRouter();
  const [checkId, setCheckId] = useState<FormValidateType>('writing');

  const apiUri = '/api/signup';
  const signUpForm = useForm<ISignUpSchema>();
  const { request: postRequest, clear: postClear, data: postData, isLoading: postIsLoading } = useRequest<TReturnSignUpPOST>(apiUri);
  const { request: getRequest, clear: getClear, data: getData, isLoading: getIsLoading } = useRequest<TReturnSignUpGET>(apiUri);

  useEffect(() => {
    if (postData) {
      if (postData.success === true) {
        toast.success('회원가입이 완료되었습니다.');
        signUpForm.reset();
        router.replace('/');
      } else if (postData.message) {
        toast.error(postData.message);
      }
    }
    if (getData) {
      if (getData.check === true) {
        setCheckId('available');
      } else {
        setCheckId('error');
      }
    }
  }, [signUpForm, postData, getData, router]);

  async function checkDuplicates() {
    const userId = signUpForm.getValues('id');
    if (userId) {
      getClear();
      postClear();
      getRequest(new FormData(), 'GET', `${apiUri}?id=${userId}`);
    }
  }

  async function onValid(form: ISignUpSchema) {
    if (signUpForm.getValues('birth') === undefined) {
      toast.error('생년월일을 입력해주세요.');
      return;
    }
    if (checkId !== 'available') {
      toast.error('아이디 중복을 확인해주세요.');
      return;
    }
    if (postIsLoading) {
      return;
    }

    const reqForm = ObjectToFormData(form);

    postClear();
    postRequest(reqForm, 'POST');
  }

  async function onInvlalid(errors: FieldErrors<ISignUpSchema>) {
    const [error] = Object.values(errors);
    if (error && error.message) {
      toast.error(error.message);
    }
  }

  return {
    signUpForm,
    data: postData,
    checkId,
    setCheckId,
    checkIdLoading: getIsLoading,
    isLoading: postIsLoading,
    checkDuplicates,
    register: signUpForm.register,
    setValue: signUpForm.setValue,
    handleSubmit: signUpForm.handleSubmit(onValid, onInvlalid),
  };
}
