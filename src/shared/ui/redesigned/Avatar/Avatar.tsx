import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '../Icon/Icon';
import { Skeleton } from '../Skeleton';
import { LazyImage } from '../../redesigned/LazyImage';
import cl from './Avatar.module.scss';
import ProfileIcon from '@/shared/assets/icons/profile-icon.svg';
import { UploadFile } from '../UploadFile';
import { Card } from '../Card';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';

export type AvatarLoading = 'lazy' | 'eager';

interface AvatarProps {
  className?: string;
  onChangeAvatar?: (file: File) => void;
  src?: string;
  alt?: string;
  size?: number;
  loading?: AvatarLoading;
  readonly?: boolean;
}

export const Avatar = (props: AvatarProps) => {
  const {
    className,
    onChangeAvatar,
    src,
    alt,
    size = 100,
    loading = 'lazy',
    readonly = true,
  } = props;

  const { t } = useTranslation();

  const fallback = <Skeleton width={size} height={size} border="circle" />;
  const errorFallback = <Icon width={size} height={size} Svg={ProfileIcon} />;

  const handleFileSelect = useCallback((selectedFile: File) => {
    onChangeAvatar?.(selectedFile);
  }, [onChangeAvatar]);

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
              preview
              previewCircle
              previewSize={size}
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
