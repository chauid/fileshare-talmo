'use client';

import { TReturnSignUpPOST, TReturnSignUpPUT } from '@app/api/signup/route';
import useMutation from '@lib/client/use-mutation';
import { IPOSTSignUpSchema } from '@lib/schemas/sign-up-schema';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export type FormValidateType = 'available' | 'error' | 'writing';

export default function useSignUp() {
  const router = useRouter();
  const [checkId, setCheckId] = useState<FormValidateType>('writing');

  const apiUri = '/api/signup';
  const signUpForm = useForm<IPOSTSignUpSchema>();
  const { request: postRequest, clear: postClear, data: postData, isLoading: postIsLoading } = useMutation<TReturnSignUpPOST>(apiUri);
  const { request: putRequest, clear: putClear, data: putData, isLoading: putIsLoading } = useMutation<TReturnSignUpPUT>(apiUri);

  useEffect(() => {
    if (postData) {
      if (postData.success) {
        toast.success('회원가입이 완료되었습니다.');
        signUpForm.reset();
        router.replace('/');
      } else if (postData.message) {
        toast.error(postData.message);
      }
    }
    if (putData) {
      if (putData.success) {
        setCheckId('available');
      } else {
        setCheckId('error');
      }
    }
  }, [signUpForm, postData, putData, router]);

  async function checkDuplicates() {
    const userId = signUpForm.getValues('id');
    if (userId) {
      putClear();
      postClear();
      putRequest({ id: userId }, 'PUT');
    }
  }

  async function onValid(form: IPOSTSignUpSchema) {
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

    postClear();
    postRequest(form, 'POST');
  }

  async function onInvlalid(errors: FieldErrors<IPOSTSignUpSchema>) {
    const [error] = Object.values(errors);
    if (error && error.message) {
      toast.error(error.message);
    }
  }

  return {
    signUpForm,
    checkId,
    setCheckId,
    checkIdLoading: putIsLoading,
    isLoading: postIsLoading,
    checkDuplicates,
    register: signUpForm.register,
    setValue: signUpForm.setValue,
    handleSubmit: signUpForm.handleSubmit(onValid, onInvlalid),
  };
}
