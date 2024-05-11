import { SWRProvider } from '@app/swr-provider';
import MainLayout from '@components/layouts/main-layout';
import { ThemeModeScript } from 'flowbite-react';
import { Gothic_A1 } from 'next/font/google';
import React from 'react';

import type { Metadata } from 'next';

import 'react-loading-skeleton/dist/skeleton.css';
import './globals.css';

const gothic_a1 = Gothic_A1({
  subsets: ['latin'],
  weight: '500',
});

export const metadata: Metadata = {
  title: 'Talmo - 파일 공유 웹',
  description: '탈모를 겪고 있는 서승환씨의 눈물겨운 파일 공유 이야기',
  keywords: 'nextjs, fileshare, fileshare-talmo, talmo-fileshare, talmo, seunghwan',
  authors: [{ name: 'chauid' }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <ThemeModeScript />
      </head>
      <body className={gothic_a1.className}>
        <SWRProvider>
          <MainLayout>{children}</MainLayout>
        </SWRProvider>
      </body>
    </html>
  );
}
