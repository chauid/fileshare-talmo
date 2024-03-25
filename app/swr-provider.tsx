'use client';

import React from 'react';
import { SWRConfig } from 'swr';

export const SWRProvider = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig
    value={{
      fetcher: (uri: string) => fetch(uri).then((res) => {
        if (!res.ok) {
          throw new Error('Error while Fetching Data.');
        }
        return res.json();
      }),
    }}
  >
    {children}
  </SWRConfig>
);
export default SWRProvider;
