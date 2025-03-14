import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated, SkeletonAlign } from '@/shared/ui/deprecated/Skeleton';

import { Card } from '@/shared/ui/redesigned/Card';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleEditFormSkeletonProps {
    className?: string;
}

export const ArticleEditFormSkeleton = memo((props: ArticleEditFormSkeletonProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <Card offset="24" className={getVstack({ gap: 24 })}>
          <Skeleton width="100%" border="4" height={30} />

          <Skeleton width="100%" border="4" height={40} />
          <Skeleton width="100%" border="4" height={40} />
          <Skeleton width="100%" border="4" height={30} />
          <HStack gap="16">
            <Skeleton width={100} height={20} border="4" />
            <Skeleton width={100} height={20} border="4" />
            <Skeleton width={100} height={20} border="4" />
          </HStack>

          <Skeleton width="100%" border="4" height={100} />
          <Skeleton width="100%" border="4" height={100} />

          <Skeleton width="100%" border="4" height={100} />
          <Skeleton width="100%" border="4" height={100} />

          <HStack width={200} gap="16">
            <Skeleton width={100} height={20} border="4" />
            <Skeleton width={100} height={20} border="4" />
          </HStack>

          <HStack fullWidth tag="div" gap="16">
            <Skeleton width={100} height={20} border="4" />
            <Skeleton width={100} height={20} border="4" />
            <Skeleton width={100} height={20} border="4" />
          </HStack>
        </Card>
      )}
      off={(
        <Card border="0" offset="24" className={getVstack({ gap: 24 })}>
          <SkeletonDeprecated width="100%" border="4" height={30} />

          <SkeletonDeprecated width="100%" border="4" height={40} />
          <SkeletonDeprecated width="100%" border="4" height={40} />
          <SkeletonDeprecated width="100%" border="4" height={30} />
          <HStack gap="16">
            <SkeletonDeprecated align={SkeletonAlign.DEFAULT} width={100} height={20} border="4" />
            <SkeletonDeprecated align={SkeletonAlign.DEFAULT} width={100} height={20} border="4" />
            <SkeletonDeprecated align={SkeletonAlign.DEFAULT} width={100} height={20} border="4" />
          </HStack>

          <SkeletonDeprecated width="100%" border="4" height={100} />
          <SkeletonDeprecated width="100%" border="4" height={100} />

          <SkeletonDeprecated width="100%" border="4" height={100} />
          <SkeletonDeprecated width="100%" border="4" height={100} />

          <HStack width={200} gap="16">
            <SkeletonDeprecated width={100} height={20} border="4" />
            <SkeletonDeprecated width={100} height={20} border="4" />
          </HStack>

          <HStack fullWidth tag="div" gap="16">
            <SkeletonDeprecated align={SkeletonAlign.DEFAULT} width={100} height={20} />
            <SkeletonDeprecated align={SkeletonAlign.DEFAULT} width={100} height={20} />
            <SkeletonDeprecated align={SkeletonAlign.DEFAULT} width={100} height={20} />
          </HStack>
        </Card>
      )}
    />
  );
});
