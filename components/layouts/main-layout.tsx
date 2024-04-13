'use client';

import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import AsideLayout from '@components/layouts/aside';
import ContentLayout from '@components/layouts/content';
import FooterLayout from '@components/layouts/footer';
import HeaderLayout from '@components/layouts/header';
import UserAuthContext from '@lib/client/contexts/user-context';
import useLayout from '@lib/client/hooks/use-layout';

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const temp = useContext(UserAuthContext);
  const { userInfo } = useLayout();

  const [asideActive, setAsideActive] = useState(false);
  const [screenSize, SetScreenSize] = useState(0);

  function asideScrollLock(active: boolean) {
    document.body.style.overflow = active ? 'hidden' : '';
    document.body.style.touchAction = active ? 'none' : '';
  }

  useEffect(() => {
    asideScrollLock(asideActive);

    SetScreenSize(window.innerWidth);
    window.addEventListener('resize', () => {
      SetScreenSize(window.innerWidth);
    });

    return () => {
      window.removeEventListener('resize', () => {
        SetScreenSize(window.innerWidth);
      });
    };
  }, [asideActive, temp]);

  return (
    <>
      <HeaderLayout asideToggle={asideActive} screenSize={screenSize} setAsideToggle={setAsideActive} userInfo={userInfo} />
      <AsideLayout asideToggle={asideActive} screenSize={screenSize} setAsideToggle={setAsideActive} userInfo={userInfo} />
      <div className={`relative z-0 ${screenSize >= 1024 && 'left-[256px] w-[calc(100%_-_256px)]'}`}>
        <ContentLayout screenSize={screenSize}>{children}</ContentLayout>
        <FooterLayout screenSize={screenSize} />
      </div>
      <div
        className={clsx(
          'fixed left-0 top-0 z-10 h-full w-full bg-black transition-all duration-500',
          `${asideActive ? 'pointer-events-auto opacity-50' : 'pointer-events-none opacity-0'}`,
        )}
        onClick={() => {
          setAsideActive(false);
        }}
      />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={10}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#FFFFFF',
            color: '#000000',
          },
        }}
      />
    </>
  );
}
