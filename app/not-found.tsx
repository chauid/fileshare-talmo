'use client';

import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  function pageBack() {
    router.back();
  }
  return (
    <div className="flex h-[calc(100vh_-_22rem)] flex-col items-center justify-center gap-8">
      <h1 className="text-2xl font-bold">페이지를 찾을 수 없습니다.</h1>
      <div className="max-w-[25rem]">
        <p>
          요청한 URL을 서버에서 찾을 수 없습니다.
          <br />
          URL 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
        </p>
      </div>
      <Button color="failure" onClick={pageBack}>
        이전 페이지로
      </Button>
    </div>
  );
}
