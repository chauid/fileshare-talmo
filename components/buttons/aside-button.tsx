'use client';

import clsx from 'clsx';
import { HiMenu } from 'react-icons/hi';

interface IAsideToggleProps {
  toggle: boolean;
  toggleHandle: (asideState: boolean) => void;
}

export default function AsideButton({ toggle, toggleHandle }: IAsideToggleProps) {
  return (
    <div className="flex items-center justify-center rounded-full" aria-label="button padding">
      <button
        type="button"
        className={clsx(
          'absolute z-0 items-center justify-center rounded-full p-5 opacity-50 transition-all duration-200',
          'hover:bg-gray-400',
          'active:bg-gray-300',
        )}
        onClick={() => {
          toggleHandle(!toggle);
        }}
      />
      <HiMenu size={30} className="pointer-events-none z-10" />
    </div>
  );
}
