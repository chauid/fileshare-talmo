'use client';

import { Footer } from 'flowbite-react';
import Skeleton from 'react-loading-skeleton';

interface IFooterProps {
  screenSize: number;
}

export default function FooterLayout({ screenSize }: IFooterProps) {
  return (
    <>
      {screenSize !== 0 ? (
        <Footer container className="relative h-40 border-t-[1px] border-gray-300">
          <Footer.Copyright href="/" by="chauid All Rights Reserved. TalmoGroup™ is unregistered trademark." year={2024} />
          {screenSize < 768 && <Footer.Divider />}
          <Footer.LinkGroup>
            <Footer.Link href="#">License</Footer.Link>
            <Footer.Link href="https://github.com/chauid" target="_blank">
              Github
            </Footer.Link>
          </Footer.LinkGroup>
        </Footer>
      ) : (
        <Footer container className="relative h-40 border-t-[1px] border-gray-300">
          <div className="h-5 w-4/6">
            <Skeleton height="100%" borderRadius="0.5rem" />
          </div>
          <Footer.LinkGroup className="w-52 p-5">
            <div className="mx-[10%] h-5 w-2/5">
              <Skeleton height="100%" borderRadius="0.5rem" />
            </div>
            <div className="h-5 w-2/5">
              <Skeleton height="100%" borderRadius="0.5rem" />
            </div>
          </Footer.LinkGroup>
        </Footer>
      )}
    </>
  );
}
