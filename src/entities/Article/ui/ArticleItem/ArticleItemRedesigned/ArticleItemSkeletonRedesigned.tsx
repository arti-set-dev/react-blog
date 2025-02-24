import { memo } from 'react';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleView } from '../../../model/consts/consts';

interface ArticleItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleItemSkeletonRedesigned = memo((props: ArticleItemSkeletonProps) => {
  const { className, view } = props;

  if (view === ArticleView.COLUMN) {
    return (
      <Card max offset="24" className={getVstack({ gap: 16 })}>
        <HStack gap="8" align="center">
          <Skeleton
            width={30}
            height={30}
            border="circle"
          />
          <Skeleton
            width={100}
            height={16}
          />
          <Skeleton width={100} height={16} />
        </HStack>
        <Skeleton width="100%" height={16} />
        <Skeleton width="100%" height={300} />
        <HStack gap="32" justify="between">
          <Skeleton width={100} height={16} />
          <Skeleton width={100} height={16} />
        </HStack>
      </Card>
    );
  }

  return (
    <Card max offset="16" className={getVstack({ gap: 16 })}>
      <Skeleton border="10" width="100%" height="200px" />
      <VStack>
        <HStack fullWidth gap="8">
          <Skeleton
            border="10"
            width="100px"
            height="16px"
          />
          <Skeleton
            border="10"
            width="100px"
            height="16px"
          />
        </HStack>
      </VStack>
    </Card>
  );
});
