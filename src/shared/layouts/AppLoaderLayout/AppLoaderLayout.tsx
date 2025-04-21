import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '../MainLayout';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Container } from '@/shared/ui/redesigned/Container';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import cls from './AppLoaderLayout.module.scss';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface AppLoaderLayoutProps {
  className?: string;
}

export const AppLoaderLayout = memo((props: AppLoaderLayoutProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <MainLayout
      header={(
        <Skeleton width="100%" height={70} />
      )}
      sidebar={(
        <VStack width={305} height="100%" className={cls.sidebar}>
          <Skeleton width="100%" height="100%" />
        </VStack>
      )}
      content={(
        <Container max className={getVstack({ gap: 24 })}>
          <Skeleton width="100%" height={200} />
          <Skeleton width="100%" height={70} />
          <Skeleton width="100%" height={420} />
        </Container>
      )}
      footer={(
        <Container max>
          <Skeleton width="100%" height={80} />
        </Container>
      )}
    />
  );
});
