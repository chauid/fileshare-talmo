'use client';

import clsx from 'clsx';
import { Avatar, Dropdown } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { HiCog, HiOutlineLogin, HiOutlineLogout, HiUserAdd } from 'react-icons/hi';
import Skeleton from 'react-loading-skeleton';

import AsideButton from '@components/buttons/aside-button';

interface IHeaderProps {
  asideToggle: boolean;
  screenSize: number;
  asideToggleHandle: (asideState: boolean) => void;
}

export default function HeaderLayout({ asideToggle, screenSize, asideToggleHandle }: IHeaderProps) {
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
                <AsideButton toggle={asideToggle} toggleHandle={asideToggleHandle} />
              </div>
            )}
            <Link href="/" className="ml-3 flex items-center">
              <Image src={'/fileshare128.png'} width={40} height={40} alt="FileShare Logo" className=" inline-block" />
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
            <Dropdown label={<Avatar alt="User Profile" img="/images/people/profile-picture-5.jpg" rounded />} arrowIcon={false} inline>
              <Dropdown.Header>
                <span className="block text-sm">사용자 닉네임</span>
              </Dropdown.Header>
              <Dropdown.Item icon={HiCog}>프로필 및 설정</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item icon={HiOutlineLogin}>로그인</Dropdown.Item>
              <Dropdown.Item icon={HiOutlineLogout}>로그아웃</Dropdown.Item>
              <Dropdown.Item icon={HiUserAdd}>회원가입</Dropdown.Item>
            </Dropdown>
          </div>
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
