'use client';

import clsx from 'clsx';
import { Sidebar } from 'flowbite-react';
import Link from 'next/link';
import { HiShoppingBag, HiTable, HiOutlineLogin, HiOutlineLogout, HiUserAdd } from 'react-icons/hi';
import Skeleton from 'react-loading-skeleton';

import { IUserInfo } from '@lib/client/hooks/use-layout';

interface IAsideProps {
  asideToggle: boolean;
  screenSize: number;
  setAsideToggle: (asideState: boolean) => void;
  userInfo: IUserInfo;
}

export default function AsideLayout({ asideToggle, screenSize, setAsideToggle, userInfo }: IAsideProps) {
  return (
    <>
      {screenSize !== 0 ? (
        <aside className={`fixed top-16 z-20 mt-[1px] h-full duration-500 ${screenSize < 1024 || screenSize === 0 ? 'left-[-256px]' : 'left-0'}`}>
          <Sidebar
            className={clsx(
              'transform-gpu transition-all duration-500 ease-in-out',
              `${screenSize < 1024 && asideToggle ? 'translate-x-[100%]' : 'translate-x-0'}`,
            )}
          >
            <div className="h-4" aria-label="blank" />
            <Sidebar.Items className="">
              <Sidebar.ItemGroup>
                <Sidebar.Collapse icon={HiShoppingBag} label="파일 공유 그룹">
                  <Sidebar.Item href="#">그룹명</Sidebar.Item>
                </Sidebar.Collapse>
                <Sidebar.Item href="#" icon={HiTable}>
                  Sign Up
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
            <Sidebar.Items className="fixed bottom-0 mb-20 w-56">
              <Sidebar.ItemGroup>
                {userInfo.id ? (
                  <Sidebar.Item
                    as={Link}
                    href="/logout"
                    icon={HiOutlineLogout}
                    onClick={() => {
                      setAsideToggle(false);
                    }}
                  >
                    로그아웃
                  </Sidebar.Item>
                ) : (
                  <Sidebar.Item
                    as={Link}
                    href="/login"
                    icon={HiOutlineLogin}
                    onClick={() => {
                      setAsideToggle(false);
                    }}
                  >
                    로그인
                  </Sidebar.Item>
                )}
                {!userInfo.id && (
                  <Sidebar.Item
                    as={Link}
                    href="/signup"
                    icon={HiUserAdd}
                    onClick={() => {
                      setAsideToggle(false);
                    }}
                  >
                    회원가입
                  </Sidebar.Item>
                )}
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </aside>
      ) : (
        <aside className="top-15 fixed z-20 h-full bg-gray-50 lg:w-[256px]">
          <div className="flex h-full flex-col gap-5 px-5 pt-20">
            <Skeleton height="35px" borderRadius="0.5rem" />
            <Skeleton height="35px" borderRadius="0.5rem" />
            <Skeleton height="35px" borderRadius="0.5rem" />
            <Skeleton height="35px" borderRadius="0.5rem" />
            <Skeleton height="35px" borderRadius="0.5rem" />
          </div>
          <div className="fixed bottom-0 mb-10 flex w-56 flex-col gap-5 px-5 max-lg:left-[-256px]">
            <Skeleton height="35px" borderRadius="0.5rem" />
            <Skeleton height="35px" borderRadius="0.5rem" />
            <Skeleton height="35px" borderRadius="0.5rem" />
          </div>
        </aside>
      )}
    </>
  );
}
