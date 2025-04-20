import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthModal } from '@/features/AuthService';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { LazyImage } from '@/shared/ui/redesigned/LazyImage';
import { getRouteArticleCreate } from '@/shared/const/router';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Theme } from '@/shared/const/theme';
import { Flex } from '@/shared/ui/redesigned/Stack/Flex/Flex';
import { getFlex } from '@/shared/lib/stack/getFlex/getFlex';

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
  const { theme } = useTheme();

  return (
    <Card
      offset="24"
      tag="section"
      className={getFlex({
        gap: 16,
        responsive: {
          md: {
            direction: 'column',
          },
        },
      })}
    >
      <VStack flexBasis="50%" gap="16" justify="center" fullWidth>
        <VStack width="491px" gap="16">
          <Text tag="h1" weight="bold" size="xxl">{t('Platform for creating content')}</Text>
          <Text size="l">{t('Share your thoughts in various fields')}</Text>
        </VStack>
        <Flex
          gap="16"
          flexWrap="wrap"
          direction="initial"
          responsive={{
            md: {
              gap: '8',
            },
          }}
        >
          {userId ? (
            <Button variant="primary" onClick={onOpenCreateNewArticle}>{t('Create an article')}</Button>
          ) : (
            <Button variant="primary" onClick={() => setIsAuthModal?.(true)}>{t('Create an article')}</Button>
          )}
          <Button variant="outline" onClick={onOpenArticles}>{t('See the latest publications')}</Button>
        </Flex>
      </VStack>
      <VStack flexBasis="50%">
        {theme === Theme.DARK ? (
          <LazyImage
            width="100%"
            height="100%"
            aspectRatio="1/1"
            alt=""
            aria-hidden
            src="/images/hero-bg-light.svg"
            objectFit="contain"
          />
        ) : (
          <LazyImage
            width="100%"
            height="100%"
            aspectRatio="1/1"
            alt=""
            aria-hidden
            src="/images/hero-bg.svg"
            objectFit="contain"
          />
        )}
      </VStack>
      <AuthModal
        redirectPath={getRouteArticleCreate()}
        isOpen={isAuthModal}
        onClose={onCloseModal}
      />
    </Card>
  );
});
