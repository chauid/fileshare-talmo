import clsx from 'clsx';
import React from 'react';

export default function ContentLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main
      className={clsx(
        'relative m-auto px-10 py-32',
        'xxs:max-w-[360px] xs:max-w-[384px] sm:max-w-[480px] md:max-w-[640px] lg:max-w-[768px]', // mobile
        'x3l:max-w-[1344px] x4l:max-w-[1664px] x5l:max-w-[1904px] x6l:max-w-[2304px] xl:max-w-[1024px] xxl:max-w-[1184px]', // desktop
      )}
    >
      {children}
    </main>
  );
}
