'use client';

import useAuth from '@lib/client/hooks/use-auth';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { HiOutlineLockClosed, HiUser } from 'react-icons/hi';

export default function Login() {
  const { isLoading, register, handleSubmit } = useAuth();
  return (
    <section className="m-auto mt-20 flex max-w-[25rem] flex-col items-center justify-center gap-10">
      <strong className="text-2xl">Log in to Talmo</strong>
      <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit}>
        <TextInput
          id="user_id"
          type="text"
          icon={HiUser}
          placeholder="아이디"
          {...register('id', { required: { value: true, message: '아이디를 입력해주세요.' } })}
        />
        <TextInput
          id="user_password"
          type="password"
          autoComplete="off"
          icon={HiOutlineLockClosed}
          placeholder="비밀번호"
          {...register('password', { required: { value: true, message: '비밀번호를 입력해주세요.' } })}
        />
        <div className="flex items-center gap-2">
          <Checkbox id="user_id_cookie" {...register('id_cookie')} />
          <Label htmlFor="user_id_cookie">아이디 기억하기</Label>
        </div>
        <Button type="submit" size="lg" isProcessing={isLoading} disabled={isLoading}>
          로그인
        </Button>
      </form>
    </section>
  );
}
