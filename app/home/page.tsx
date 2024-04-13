'use client';

import { Button } from 'flowbite-react';
import toast from 'react-hot-toast';

export default function Home() {
  function tt() {
    toast.success('asd');
  }
  return (
    <section>
      <div>Home</div>
      <Button onClick={tt}>정보</Button>
    </section>
  );
}
