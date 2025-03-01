import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/redesigned/Card';
import { getHstack } from '@/shared/lib/stack/getHstack/getHstack';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { LazyImage } from '@/shared/ui/redesigned/LazyImage';
import { LoginModal } from '@/features/AuthByUsername';
import { getRouteArticleCreate } from '@/shared/const/router';
import { Container } from '@/shared/ui/redesigned/Container';

interface MainHeroDeprecatedProps {
    className?: string;
    userId?: string;
    onOpenCreateNewArticle?: () => void;
    onOpenArticles?: () => void;
    onCloseModal: () => void;
}

export const MainHeroDeprecated = memo((props: MainHeroDeprecatedProps) => {
  const {
    className, userId, onOpenCreateNewArticle, onOpenArticles, onCloseModal,
  } = props;
  const [isAuthModal, setIsAuthModal] = useState(false);
  const { t } = useTranslation('main');

  return (
    <Card
      variant="transparent"
      offset="24"
      tag="section"
      border="0"
      className={getHstack({ gap: 16, justify: 'between' })}
    >
      <Container className={getHstack({ justify: 'between' })}>
        <VStack flexBasis="50%" gap="16" justify="center">
          <VStack gap="16">
            <Text tag="h1" weight="bold" size="xxl">{t('Platform for creating content')}</Text>
            <Text size="l">{t('Share your thoughts in various fields')}</Text>
          </VStack>
          <HStack gap="16">
            {userId ? (
              <Button variant="outline" onClick={onOpenCreateNewArticle}>{t('Create an article')}</Button>
            ) : (
              <Button variant="primary" onClick={() => setIsAuthModal(true)}>{t('Create an article')}</Button>
            )}
            <Button variant="outline" onClick={onOpenArticles}>{t('See the latest publications')}</Button>
          </HStack>
        </VStack>
        <VStack flexBasis="50%">
          <LazyImage width="500" height="500" alt="" aria-hidden src="/images/hero-bg.svg" />
        </VStack>
        <LoginModal
          authId={userId}
          redirectPath={getRouteArticleCreate()}
          isOpen={isAuthModal}
          onClose={onCloseModal}
        />
      </Container>
    </Card>
  );
});
