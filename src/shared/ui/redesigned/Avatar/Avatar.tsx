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
import { HStack } from '../Stack';
import AdminIcon from '@/shared/assets/icons/shield-icon.svg';

export type AvatarLoading = 'lazy' | 'eager';

interface AvatarProps {
  className?: string;
  onChangeAvatar?: (file: File) => void;
  src?: string;
  alt?: string;
  size?: number;
  loading?: AvatarLoading;
  readonly?: boolean;
  isAdmin?: boolean;
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
    isAdmin = false,
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
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {isAdmin
              ? (
                <HStack gap="8" align="center">
                  <Icon width={25} height={25} Svg={AdminIcon} />
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
                </HStack>
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
        )}
    </>
  );
};
