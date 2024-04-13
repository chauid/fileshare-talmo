import clsx from 'clsx';
import React from 'react';

interface IContentProps extends Readonly<{ children: React.ReactNode }> {
  screenSize: number;
}

export default function ContentLayout({ children, screenSize }: IContentProps) {
  return (
    <main
      className={clsx(
        `relative m-auto min-h-[calc(100vh_-_10rem)] px-10 py-24 ${!screenSize && 'lg:pl-[296px]'}`,
        'xxs:max-w-[360px] xs:max-w-[384px] sm:max-w-[480px] md:max-w-[640px] lg:max-w-[768px]', // mobile
        'xl:max-w-[1024px] xxl:max-w-[1184px] x3l:max-w-[1344px] x4l:max-w-[1664px] x5l:max-w-[1904px] x6l:max-w-[2304px]', // desktop
      )}
    >
      {children}
    </main>
  );
}
