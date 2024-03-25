'use client';

import useSWR from 'swr';

export default function Logout() {
  const { data } = useSWR('/api');
  return <div>logout</div>;
}
