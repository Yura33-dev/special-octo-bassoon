'use client';

import { CircleX } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface IFileUploaderProps {
  name: string;
  image: string | null;
  onChange: (file: File | null) => void;
  touched: Record<string, boolean>;
  errors: Record<string, string | string[]>;
}

export default function FileUploader({
  image,
  onChange,
  name,
  touched,
  errors,
}: IFileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(image);

  useEffect(() => {
    setPreview(image || null);
  }, [image]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
      } else {
        setFile(null);
        setPreview('/no-image.webp');
      }
      onChange(selectedFile);
    }
  };

  const removeFile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setFile(null);
    setPreview('/no-image.webp');
    onChange(null);
  };

  return (
    <label
      className='flex flex-col justify-start gap-2 rounded-md hover:cursor-pointer max-w-max mt-6'
      htmlFor={name}
    >
      <span className='text-sm font-semibold'>Зображення</span>
      <input
        type='file'
        accept='image/*'
        name={name}
        id={name}
        className='hidden'
        onChange={handleFileChange}
      />

      <div className='relative w-36 h-36'>
        <Image
          src={preview ?? '/no-image.webp'}
          alt='Preview'
          className='w-full h-full object-cover rounded-md'
          width={200}
          height={200}
          priority
        />
        {preview !== '/no-image.webp' &&
          preview !== null &&
          preview !== undefined && (
            <button
              onClick={removeFile}
              className='absolute top-1 right-1 bg-red-500 text-white p-1 rounded-md hover:bg-red-600 transition-colors'
            >
              <CircleX className='w-5 h-5' />
            </button>
          )}
      </div>

      {file && <p className='text-gray-700 text-sm'>{file.name}</p>}

      {touched[name] && errors[name] ? (
        <p className='text-xs pl-2 text-red-600'>{errors[name]}</p>
      ) : null}
    </label>
  );
}
