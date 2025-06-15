'use client';

import clsx from 'clsx';
import { FormikErrors, FormikTouched } from 'formik';
import { get } from 'lodash';
import { CircleX } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface IFileUploaderProps<T> {
  name: string;
  imageUrl: string | null;
  onChange: (file: File | null) => void;
  touched: FormikTouched<T>;
  errors: FormikErrors<T>;
  labelClassName?: string;
}

export default function FileUploader<T>({
  imageUrl,
  onChange,
  name,
  touched,
  errors,
  labelClassName,
}: IFileUploaderProps<T>) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(imageUrl);

  useEffect(() => {
    if (!imageUrl) {
      setFile(null);
      setPreview('/no-image.webp');
    } else {
      setPreview(imageUrl);
    }
  }, [imageUrl]);

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
      className={clsx(
        'flex flex-col justify-start gap-2 rounded-md hover:cursor-pointer max-w-max',
        labelClassName && labelClassName
      )}
      htmlFor={String(name)}
    >
      <span className='text-sm font-semibold'>Зображення</span>
      <input
        type='file'
        accept='image/*'
        name={String(name)}
        id={String(name)}
        className='hidden'
        onChange={handleFileChange}
      />

      <div className='relative w-36 h-36'>
        <Image
          src={
            typeof preview === 'string' && preview !== ''
              ? preview
              : '/no-image.webp'
          }
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

      {get(touched, name) && get(errors, name) ? (
        <p className='text-xs pl-2 text-red-600'>{String(get(errors, name))}</p>
      ) : null}
    </label>
  );
}
