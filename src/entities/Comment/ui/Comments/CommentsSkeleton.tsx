import { HStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Card } from '@/shared/ui/redesigned/Card';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';

interface CommentsSkeletonProps {
    className?: string;
}

export const CommentsSkeleton = (props: CommentsSkeletonProps) => {
  const { className } = props;
  return (
    <>
      <Card
        className={getVstack({ gap: 16 })}
        max
        offset="16"
      >
        <HStack gap="16">
          <Skeleton width={30} height={30} border="circle" />
          <Skeleton width={200} height={20} />
        </HStack>
        <Skeleton width="100%" height={20} />
      </Card>
      <Card
        className={getVstack({ gap: 16 })}
        max
        offset="16"
      >
        <HStack gap="16">
          <Skeleton width={30} height={30} border="circle" />
          <Skeleton width={200} height={20} />
        </HStack>
        <Skeleton width="100%" height={20} />
      </Card>
      <Card
        className={getVstack({ gap: 16 })}
        max
        offset="16"
      >
        <HStack gap="16">
          <Skeleton width={30} height={30} border="circle" />
          <Skeleton width={200} height={20} />
        </HStack>
        <Skeleton width="100%" height={20} />
      </Card>
    </>
  );
};
