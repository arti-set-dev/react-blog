import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import { getHstack } from '@/shared/lib/stack/getHstack/getHstack';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { LazyImage } from '@/shared/ui/redesigned/LazyImage';
import { LoginModal } from '@/features/AuthByUsername';
import { getRouteArticleCreate } from '@/shared/const/router';

interface MainHeroRedesignedProps {
    className?: string;
    userId?: string;
    onOpenCreateNewArticle?: () => void;
    onOpenArticles?: () => void;
    onCloseModal: () => void;
    isAuthModal?: boolean;
    setIsAuthModal?: (value: boolean) => void;
}

export const MainHeroRedesigned = memo((props: MainHeroRedesignedProps) => {
  const {
    className, userId, onOpenCreateNewArticle, onOpenArticles, onCloseModal, isAuthModal, setIsAuthModal,
  } = props;
  const { t } = useTranslation('main');

  return (
    <Card
      offset="24"
      tag="section"
      className={classNames(getHstack({ gap: 16, justify: 'between' }))}
    >
      <VStack flexBasis="50%" gap="16" justify="center">
        <VStack gap="16">
          <Text tag="h1" weight="bold" size="xxl">{t('Platform for creating content')}</Text>
          <Text size="l">{t('Share your thoughts in various fields')}</Text>
        </VStack>
        <HStack gap="16">
          {userId ? (
            <Button variant="primary" onClick={onOpenCreateNewArticle}>{t('Create an article')}</Button>
          ) : (
            <Button variant="primary" onClick={() => setIsAuthModal?.(true)}>{t('Create an article')}</Button>
          )}
          <Button variant="outline" onClick={onOpenArticles}>{t('See the latest publications')}</Button>
        </HStack>
      </VStack>
      <VStack flexBasis="50%">
        <LazyImage width="600" height="600" alt="" aria-hidden src="/images/hero-bg.svg" />
      </VStack>
      <LoginModal
        redirectPath={getRouteArticleCreate()}
        isOpen={isAuthModal}
        onClose={onCloseModal}
      />
    </Card>
  );
});
