import { memo } from 'react';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleView } from '../../../model/consts/consts';
import cl from './ArticleItemRedesigned.module.scss';

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
            border="50%"
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
    <li className={classNames('', {}, [className, cl[view]])}>
      <Card className={classNames('', {}, [className])}>
        <Skeleton width="100%" height="200px" />
        <div>
          <div>
            <Skeleton
              width="100px"
              height="16px"
            />
            <Skeleton
              width="100px"
              height="16px"
            />
          </div>
          <Skeleton width="100%" height="16px" />
        </div>
      </Card>
    </li>
  );
});
