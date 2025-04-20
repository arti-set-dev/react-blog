import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthModal } from '@/features/AuthService';
import { Card } from '@/shared/ui/redesigned/Card';
import { getHstack } from '@/shared/lib/stack/getHstack/getHstack';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text, TextSize, TextWeight } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { LazyImage } from '@/shared/ui/redesigned/LazyImage';
import { Container } from '@/shared/ui/redesigned/Container';
import { getRouteArticleCreate } from '@/shared/const/router';
import { Flex } from '@/shared/ui/redesigned/Stack/Flex/Flex';
import { getFlex } from '@/shared/lib/stack/getFlex/getFlex';

interface MainHeroDeprecatedProps {
    className?: string;
    userId?: string;
    onOpenCreateNewArticle?: () => void;
    onOpenArticles?: () => void;
    onCloseModal: () => void;
    isAuthModal?: boolean;
    setIsAuthModal?: (value: boolean) => void;
}

export const MainHeroDeprecated = memo((props: MainHeroDeprecatedProps) => {
  const {
    className, userId, onOpenCreateNewArticle, onOpenArticles, onCloseModal, isAuthModal, setIsAuthModal,
  } = props;
  const { t } = useTranslation('main');

  return (
    <Card
      variant="transparent"
      offset="0"
      tag="section"
      border="0"
      className={getHstack({ gap: 16, justify: 'between' })}
    >
      <Container
        max
        className={getFlex({
          justify: 'between',
          responsive: {
            sm: {
              direction: 'column',
            },
          },
        })}
      >
        <VStack flexBasis="50%" gap="16" justify="center" fullWidth>
          <VStack gap="16" style={{ maxWidth: '85%' }}>
            <Text tag="h1" weight={TextWeight.BOLD} size={TextSize.XXL}>{t('Platform for creating content')}</Text>
            <Text size={TextSize.L}>{t('Share your thoughts in various fields')}</Text>
          </VStack>
          <Flex
            gap="16"
            direction="initial"
            flexWrap="wrap"
            responsive={{
              md: {
                gap: '8',
              },
            }}
          >
            {userId ? (
              <Button variant="outline" onClick={onOpenCreateNewArticle}>{t('Create an article')}</Button>
            ) : (
              <Button variant="outline" onClick={() => setIsAuthModal?.(true)}>{t('Create an article')}</Button>
            )}
            <Button variant="outline" onClick={onOpenArticles}>{t('See the latest publications')}</Button>
          </Flex>
        </VStack>
        <VStack flexBasis="50%">
          <LazyImage
            width="100%"
            height="100%"
            aspectRatio="1/1"
            alt=""
            aria-hidden
            src="/images/hero-bg.svg"
            objectFit="contain"
          />
        </VStack>
        <AuthModal
          redirectPath={getRouteArticleCreate()}
          isOpen={isAuthModal}
          onClose={onCloseModal}
        />
      </Container>
    </Card>
  );
});
