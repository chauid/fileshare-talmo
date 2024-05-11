'use client';

import Image from 'next/image';
import React from 'react';

interface InputDropZoneProps {
  src: string;
  alt: string;
  className?: string;
  size: number;
  accept: string;
  onDrop: React.DragEventHandler<HTMLLabelElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function InputDropZone({ src, alt, className, size, accept, onDrop, onChange }: InputDropZoneProps) {
  return (
    <label htmlFor="dropzone" className={className} onDrop={onDrop}>
      Input
      {src.length > 0 && <Image src={src} width={size} height={size} alt={alt} />}
      <input id="dropzone" type="file" accept={accept} onChange={onChange} hidden/>
    </label>
  );
}
