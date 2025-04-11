import React, { memo, useRef, useState } from 'react';
import cl from './UploadFile.module.scss';
import { Button } from '../Button';
import { Text } from '../Text';
import { HStack, VStack } from '../Stack';
import { LazyImage } from '../LazyImage';
import { classNames } from '@/shared/lib/classNames/classNames';

interface UploadFileProps {
  className?: string;
  onFileSelect?: (file: File) => void;
  placeholder?: string;
  accept?: string;
  multiple?: boolean;
  preview?: boolean;
  previewCircle?: boolean;
  previewSize?: number;
  'data-testid'?: string;
}

export const UploadFile = memo((props: UploadFileProps) => {
  const {
    className,
    onFileSelect,
    placeholder = 'Upload file',
    accept,
    multiple = false,
    preview = false,
    previewCircle = false,
    previewSize = 100,
    'data-testid': dataTestId,
  } = props;

  const [fileName, setFileName] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      if (preview) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }
      onFileSelect?.(file);
    }
  };

  const handlePlaceholderClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <HStack>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
        className={cl.hiddenInput}
        data-testid={`${dataTestId}.Input`}
      />
      <VStack gap="8">
        {preview && previewUrl ? (
          <div
            onClick={handlePlaceholderClick}
            className={classNames(cl.previewWrapper, { [cl.previewCircle]: previewCircle })}
          >
            <LazyImage
              src={previewUrl}
              alt={fileName}
              width={previewSize}
              height={previewSize}
              className={cl.preview}
            />
          </div>
        ) : (
          <Button
            variant="text-light"
            onClick={handlePlaceholderClick}
            data-testid={dataTestId}
          >
            {placeholder}
          </Button>
        )}
        {(fileName && !preview) && (
          <Text cropped="1">
            {fileName}
          </Text>
        )}
      </VStack>
    </HStack>
  );
});
