'use client';

import clsx from 'clsx';
import { Avatar, Dropdown } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { HiCog, HiOutlineLogin, HiOutlineLogout, HiUserAdd } from 'react-icons/hi';
import Skeleton from 'react-loading-skeleton';

import AsideButton from '@components/buttons/aside-button';
import { IUserInfo } from '@lib/client/hooks/use-layout';

interface IHeaderProps {
  asideToggle: boolean;
  screenSize: number;
  setAsideToggle: (asideState: boolean) => void;
  userInfo: IUserInfo;
}

export default function HeaderLayout({ asideToggle, screenSize, setAsideToggle, userInfo }: IHeaderProps) {
  return (
    <>
      {screenSize !== 0 ? (
        <header
          className={clsx(
            'fixed z-30 flex w-full items-center border-b-[1px] border-gray-300 bg-white p-2',
            'max-xxs:justify-between xxs:justify-between md:justify-around xl:justify-evenly',
          )}
        >
          <div className="m-1 flex items-center justify-center">
            {screenSize < 1024 && (
              <div className="m-1 flex items-center justify-center">
                <AsideButton toggle={asideToggle} toggleHandle={setAsideToggle} />
              </div>
            )}
            <Link
              href="/"
              className="ml-3 flex items-center"
              onClick={() => {
                setAsideToggle(false);
              }}
            >
              <Image src={'/fileshare128.png'} width={40} height={40} alt="FileShare Logo" className="inline-block" />
              <strong className="ml-3 text-2xl">Talmo</strong>
              {screenSize >= 1024 && (
                <div>
                  <strong className="ml-3 text-2xl">-</strong>
                  <strong className="ml-3 text-2xl">파일 공유 웹</strong>
                </div>
              )}
            </Link>
          </div>
          {screenSize >= 640 && <div className="mx-1" aria-label="blank" />}
          {screenSize >= 1024 && <div className="mx-1" aria-label="blank" />}
          <div className="mx-2 flex items-center justify-center">
            <Dropdown label={<Avatar alt="profile_image" img="/" rounded />} arrowIcon={false} inline>
              {userInfo.id && (
                <Dropdown.Header>
                  <span className="block text-sm">{userInfo.id}</span>
                  <span className="block text-sm text-gray-400">{userInfo.email}</span>
                </Dropdown.Header>
              )}
              {userInfo.id && (
                <Dropdown.Item
                  as={Link}
                  href="/settings/profile"
                  icon={HiCog}
                  onClick={() => {
                    setAsideToggle(false);
                  }}
                >
                  프로필 및 설정
                </Dropdown.Item>
              )}
              {userInfo.id && <Dropdown.Divider />}
              {userInfo.id ? (
                <Dropdown.Item
                  as={Link}
                  href="/logout"
                  icon={HiOutlineLogout}
                  onClick={() => {
                    setAsideToggle(false);
                  }}
                >
                  로그아웃
                </Dropdown.Item>
              ) : (
                <Dropdown.Item
                  as={Link}
                  href="/login"
                  icon={HiOutlineLogin}
                  onClick={() => {
                    setAsideToggle(false);
                  }}
                >
                  로그인
                </Dropdown.Item>
              )}
              {!userInfo.id && (
                <Dropdown.Item
                  as={Link}
                  href="/signup"
                  icon={HiUserAdd}
                  onClick={() => {
                    setAsideToggle(false);
                  }}
                >
                  회원가입
                </Dropdown.Item>
              )}
            </Dropdown>
          </div>
          {/* <button onClick={() => { console.table(userInfo); }}>DD</button> */}
        </header>
      ) : (
        <header
          className={clsx(
            'fixed z-30 flex w-full items-stretch border-b-[1px] border-gray-300 bg-white p-2',
            'max-xxs:justify-between xxs:justify-between md:justify-around xl:justify-evenly',
          )}
        >
          <div className="h-10 w-4/6">
            <Skeleton height="100%" borderRadius="0.5rem" />
          </div>
          <div className="h-10 w-10">
            <Skeleton circle height="100%" />
          </div>
        </header>
      )}
    </>
  );
}
