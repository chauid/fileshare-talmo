'use client';

import { TReturnAuthPOST } from '@app/api/auth/route';
import useMutation from '@lib/client/use-mutation';
import { IAuthSchema } from '@lib/schemas/auth-schema';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function useAuth() {
  const userIdCookie = Cookies.get('user_id');

  const apiUri = '/api/auth';
  const authForm = useForm<IAuthSchema>();
  const { request, clear, data, isLoading } = useMutation<TReturnAuthPOST>(apiUri);

  useEffect(() => {
    if (userIdCookie) {
      authForm.setValue('id', userIdCookie);
      authForm.setValue('id_cookie', true);
    }

    if (data && data.message) {
      if (data.user) {
        toast.success(data.message);
        setTimeout(() => {
          window.location.href = '/home';
        }, 500);
      } else {
        toast.error(data.message);
        const id_cookie = authForm.getValues('id_cookie');
        if (id_cookie) {
          authForm.setValue('id', '');
          authForm.setValue('password', '');
        } else {
          authForm.reset();
        }
      }
    }
  }, [authForm, data, userIdCookie]);

  async function onValid(form: IAuthSchema) {
    if (isLoading) {
      return;
    }

    clear();
    request(form, 'POST');
  }

  async function onInvlalid(errors: FieldErrors<IAuthSchema>) {
    const [error] = Object.values(errors);
    if (error && error.message) {
      toast.error(error.message);
    }
  }

  return {
    data,
    userIdCookie,
    isLoading,
    register: authForm.register,
    handleSubmit: authForm.handleSubmit(onValid, onInvlalid),
  };
}
