'use client';

import clsx from 'clsx';
import { Sidebar } from 'flowbite-react';
import { HiShoppingBag, HiTable, HiOutlineLogin, HiOutlineLogout, HiUserAdd } from 'react-icons/hi';

interface IAsideProps {
  asideToggle: boolean;
  screenSize: number;
}

export default function AsideLayout({ asideToggle, screenSize }: IAsideProps) {
  return (
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
            <Sidebar.Item href="#" icon={HiTable} className=" bg-slate-300 text-blue-500">
                  Sign Up
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        <Sidebar.Items className="fixed bottom-0 mb-20 w-56">
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiOutlineLogin}>
                  로그인
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiOutlineLogout}>
                  로그아웃
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUserAdd}>
                  회원가입
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </aside>
  );
}
