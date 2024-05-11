'use client';

import { useState } from 'react';

interface FetchState<T> {
  data?: T;
  isLoading: boolean;
  error?: object;
}

type MethodType = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type ResponseType<T> = {
  request: (dataBody: FormData, method: MethodType, uri?: string) => void;
  clear: () => void;
  data?: T;
  isLoading: boolean;
  error?: object;
};

type ResponseGetType<T> = {
  request: (uri?: string) => void;
  clear: () => void;
  data?: T;
  isLoading: boolean;
  error?: object;
};

export function useRequest<T = object>(key: string): ResponseType<T> {
  const [state, setState] = useState<FetchState<T>>({ data: undefined, isLoading: false, error: undefined });

  async function request(dataBody: FormData, method: MethodType, uri: string = key) {
    setState((prev) => ({ ...prev, isLoading: true }));
    await fetch(uri, {
      method,
      mode: 'same-origin',
      body: dataBody,
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

export function useGET<T = object>(key: string): ResponseGetType<T> {
  const [state, setState] = useState<FetchState<T>>({ data: undefined, isLoading: false, error: undefined });

  async function request(uri: string = key) {
    setState((prev) => ({ ...prev, isLoading: true }));
    await fetch(uri, {
      method: 'GET',
      mode: 'same-origin',
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
