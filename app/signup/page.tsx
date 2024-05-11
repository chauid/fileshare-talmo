'use client';

import useSignUp, { FormValidateType } from '@lib/client/hooks/use-sign-up';
import { Button, Datepicker, Label, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { HiEye, HiEyeOff, HiOutlineDeviceMobile, HiOutlineLockClosed, HiOutlineMail, HiOutlineUser, HiUser } from 'react-icons/hi';

export default function Login() {
  const { checkId, setCheckId, checkIdLoading, isLoading, checkDuplicates, register, setValue, handleSubmit } = useSignUp();
  const [passwordShow, setPasswordShow] = useState(false);
  const [checkPassword, setCheckPassword] = useState<FormValidateType>('writing');
  const [checkEmail, setCheckEmail] = useState<FormValidateType>('writing');
  const [checkPhone, setCheckPhone] = useState<FormValidateType>('writing');

  function togglePasswordShow() {
    setPasswordShow(!passwordShow);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const password = event.target.value;
    const passwordPattern = /^[a-zA-Z0-9!@#$%^&*()-_=+{};:',.<>?]+$/g;
    setCheckPassword(passwordPattern.test(password) && password.length > 7 ? 'available' : 'error');
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    const email = event.target.value;
    const emailPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    setCheckEmail(emailPattern.test(email) ? 'available' : 'error');
  }

  function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    const phone = event.target.value.replace(/\D/g, '');
    let formattedPhone = phone;
    const phonePattern = /^\d{3}-\d{3,4}-\d{4}$/;

    if (phone.length > 3) {
      formattedPhone = `${phone.slice(0, 3)}-${phone.slice(3, 6)}`;
    }
    if (phone.length > 6 && phone.length < 11) {
      formattedPhone += `-${phone.slice(6, 11)}`;
    }
    if (phone.length > 10) {
      formattedPhone = `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7, 11)}`;
    }

    setCheckPhone(phonePattern.test(formattedPhone) ? 'available' : 'error');
    setValue('phone', formattedPhone);
  }

  return (
    <section className="m-auto flex max-w-[25rem] flex-col items-center justify-center gap-10">
      <strong className="text-2xl">Sign up to Talmo</strong>
      <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit}>
        <div>
          <TextInput
            id="user_id"
            type="text"
            icon={HiUser}
            color={checkId === 'error' ? 'failure' : 'gray'}
            placeholder="아이디"
            {...register('id', {
              required: { value: true, message: '아이디를 입력해주세요.' },
              minLength: { value: 5, message: '아이디: 최소 5자 이상' },
            })}
            onChange={() => {
              setCheckId('writing');
            }}
          />
          <Label color="info" className="text-xs">
            아이디: 5~20자, 특수기호 사용불가
          </Label>
          <div className="flex items-center gap-2">
            <Button size="xs" color="light" onClick={checkDuplicates} isProcessing={checkIdLoading} disabled={checkIdLoading}>
              아이디 중복체크
            </Button>
            {checkId === 'available' && <Label className="text-emerald-500">사용가능한 아이디입니다.</Label>}
            {checkId === 'error' && <Label color="warning">중복된 아이디입니다.</Label>}
          </div>
        </div>
        <div>
          <div className="relative flex grow items-center gap-1">
            <TextInput
              className="w-full"
              id="user_password"
              type={passwordShow ? 'text' : 'password'}
              autoComplete="off"
              icon={HiOutlineLockClosed}
              color={checkPassword === 'error' ? 'failure' : 'gray'}
              placeholder="비밀번호"
              {...register('password', {
                required: { value: true, message: '비밀번호를 입력해주세요.' },
                minLength: { value: 8, message: '비밀번호: 최소 8자 이상' },
                pattern: { value: /^[a-zA-Z0-9!@#$%^&*()-_=+{};:',.<>?]+$/g, message: '영문 대/소문자, 숫자, 특수문자만 입력해주세요.' },
              })}
              onChange={handlePasswordChange}
            />
            {passwordShow ? (
              <HiEye className="absolute right-0 size-10 cursor-pointer rounded-md p-[0.625rem] text-gray-500" onClick={togglePasswordShow} />
            ) : (
              <HiEyeOff className="absolute right-0 size-10 cursor-pointer rounded-md p-[0.625rem] text-gray-500" onClick={togglePasswordShow} />
            )}
          </div>
          <Label color="info" className="text-xs">
            비밀번호: 최소 8이상, 영문 대/소문자, 숫자, 특수문자를 사용을 권장합니다.
          </Label>
        </div>
        <TextInput
          id="user_email"
          type="email"
          icon={HiOutlineMail}
          color={checkEmail === 'error' ? 'failure' : 'gray'}
          placeholder="이메일(비밀번호 찾기 등 본인 확인용)"
          {...register('email', {
            required: { value: true, message: '이메일를 입력해주세요.' },
            pattern: {
              value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: '이메일 형식이 올바르지 않습니다.',
            },
          })}
          onChange={handleEmailChange}
        />
        <hr />
        <TextInput
          id="user_name"
          type="text"
          icon={HiOutlineUser}
          placeholder="이름"
          {...register('name', { required: { value: true, message: '이름를 입력해주세요.' } })}
        />
        <TextInput
          id="user_phone"
          type="tel"
          icon={HiOutlineDeviceMobile}
          color={checkPhone === 'error' ? 'failure' : 'gray'}
          placeholder="휴대전화번호"
          {...register('phone', {
            required: { value: true, message: '휴대전화번호를 입력해주세요.' },
            pattern: { value: /^\d{3}-\d{3,4}-\d{4}$/, message: '전화번호 형식이 올바르지 않습니다.' },
          })}
          onChange={handlePhoneChange}
        />
        <Datepicker
          id="user_birth"
          language="ko-KR"
          labelTodayButton="현재 날짜"
          labelClearButton="초기화"
          onSelectedDateChanged={(date) => {
            setValue('birth', date.toISOString());
          }}
        />
        <Button type="submit" size="lg" isProcessing={isLoading} disabled={isLoading} className="mt-2">
          회원가입
        </Button>
      </form>
    </section>
  );
}
