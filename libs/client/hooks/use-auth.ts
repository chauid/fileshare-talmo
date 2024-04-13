'use client';

import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { TReturnAuthPOST } from '@app/api/auth/route';
import useRequest from '@lib/client/use-request';
import { IAuthSchema } from '@lib/schemas/auth-schema';
import { ObjectToFormData } from '@lib/utils';

export default function useAuth() {
  const userIdCookie = Cookies.get('user_id');

  const apiUri = '/api/auth';
  const authForm = useForm<IAuthSchema>();
  const { request, clear, data, isLoading } = useRequest<TReturnAuthPOST>(apiUri);

  useEffect(() => {
    if (userIdCookie) {
      authForm.setValue('id', userIdCookie);
      authForm.setValue('id_cookie', true);
    }

    if (data) {
      if (data.user) {
        if (data.user.id_cookie) {
          Cookies.set('user_id', data.user.id, { expires: 7, path: '', secure: true, sameSite: 'Strict' });
        } else {
          Cookies.remove('user_id');
        }
        toast.success(data.message);
        window.location.href = '/home';
      } else {
        toast.error(data.message);
        const id_cookie = authForm.getValues('id_cookie');
        if (id_cookie) {
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

    const reqForm = ObjectToFormData(form);

    clear();
    request(reqForm, 'POST');
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
