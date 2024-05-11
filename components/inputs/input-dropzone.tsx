'use client';

import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';

interface InputDropZoneProps {
  src?: string;
  alt: string;
  className?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function InputDropZone({ src, alt, className, onChange }: InputDropZoneProps) {
  const [hover, setHover] = useState(false);
  return (
    <figure
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={clsx('relative inline-block min-h-10 min-w-10 cursor-pointer overflow-hidden border-2 border-dashed border-gray-400', className)}
    >
      {src && (
        <Image src={src} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt={alt} priority style={{ objectFit: 'cover' }} />
      )}
      {hover && <div className="absolute h-full w-full bg-gray-300 opacity-50" />}
      {(!src || hover) && (
        <div className="absolute flex h-full w-full items-center justify-center">
          <span className="text-xl">파일 드롭</span>
        </div>
      )}
      <input
        id="dropzone"
        type="file"
        accept=".jpeg, .jpg, .png, .webp"
        onChange={onChange}
        className="absolute left-0 top-0 h-full w-full cursor-pointer bg-slate-100 opacity-0"
      />
    </figure>
  );
}
