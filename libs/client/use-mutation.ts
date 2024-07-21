'use client';

import { useState } from 'react';

interface FetchState<T> {
  data?: T;
  isLoading: boolean;
  error?: object;
}

type MethodType = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type ResponseType<T> = {
  request: (dataBody: object, method: MethodType, uri?: string) => void;
  clear: () => void;
  data?: T;
  isLoading: boolean;
  error?: object;
};

export default function useMutation<T = object>(key: string): ResponseType<T> {
  const [state, setState] = useState<FetchState<T>>({ data: undefined, isLoading: false, error: undefined });

  async function request(dataBody: object, method: MethodType, uri: string = key) {
    setState((prev) => ({ ...prev, isLoading: true }));
    await fetch(uri, {
      method,
      mode: 'same-origin',
      body: JSON.stringify(dataBody),
    })
      .then((res) => res.json())
      .then((res) => {
        setState((prev) => ({ ...prev, data: res, isLoading: false }));
      })
      .catch((error) => setState((prev) => ({ ...prev, error, loading: false })));
  }

  function clear() {
    setState({ data: undefined, isLoading: false, error: undefined });
  }

  return { request, clear, ...state };
}
