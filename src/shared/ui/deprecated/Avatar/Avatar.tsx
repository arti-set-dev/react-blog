import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';
import { LazyImage } from '../../redesigned/LazyImage';
import cl from './Avatar.module.scss';
import ProfileIcon from '@/shared/assets/icons/profile-icon.svg';
import { UploadFile } from '../../redesigned/UploadFile';
import { Card } from '../../redesigned/Card';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';

export enum AvatarLoading {
  LAZY = 'lazy',
  EAGER = 'eager',
}

interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
  loading?: AvatarLoading;
  readonly?: boolean;
}

/**
 * Outdated, use the component from the Redesigned folder
 * @deprecated
 */
export const Avatar = (props: AvatarProps) => {
  const {
    className,
    src,
    alt,
    size = 100,
    loading = AvatarLoading.LAZY,
    readonly = true,
  } = props;

  const fallback = <Skeleton width={size} height={size} border="50%" />;
  const errorFallback = <Icon width={size} height={size} Svg={ProfileIcon} />;
  const { t } = useTranslation();

  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!readonly
        ? (
          <Card
            offset="0"
            variant="active"
            tag="div"
            height={size}
            width={size}
            border="circle"
            className={getVstack({ justify: 'center', align: 'center' })}
          >
            <UploadFile
              accept="image/*"
              placeholder={t('Upload avatar')}
              onFileSelect={handleFileSelect}
              className={cl.UploadFile}
              previewSize={size}
              preview
              previewCircle
            />
          </Card>
        )
        : (
          <LazyImage
            fallback={fallback}
            errorFallback={errorFallback}
            loading={loading}
            width={size}
            height={size}
            className={classNames(cl.Avatar, {}, [className])}
            src={src}
            alt={alt}
          />
        )}
    </>
  );
};
