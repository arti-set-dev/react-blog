import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { getRouteMain } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import LogoIcon from '@/shared/assets/icons/logo.svg';
import { Text } from '@/shared/ui/redesigned/Text';
import { getHstack } from '@/shared/lib/stack/getHstack/getHstack';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Container } from '@/shared/ui/redesigned/Container';

interface FooterDeprecatedProps {
    className?: string;
    itemsList: ReactNode[];
    width?: number;
}

export const FooterDeprecated = memo((props: FooterDeprecatedProps) => {
  const { className, itemsList, width = 1200 } = props;
  const { t } = useTranslation();

  return (
    <Card
      border="0"
      tag="footer"
      offset="16"
      className={classNames('', {}, [className, getHstack({
        gap: 16,
        justify: 'between',
      })])}
    >
      <Container max className={getHstack({ justify: 'between' })}>
        <HStack align="start" justify="between" gap="32" fullWidth width={400}>
          <VStack gap="16">
            <AppLink to={getRouteMain()}>
              <Icon color="primary" width={200} height={40} Svg={LogoIcon} />
            </AppLink>
            <VStack width="140px">
              <Text>{t('Copyright')}</Text>
            </VStack>
          </VStack>
          <VStack tag="ul" gap="16">
            {itemsList}
          </VStack>
        </HStack>
        <VStack tag="ul" gap="16">
          <li>
            <AppLink to={getRouteMain()}>{t('Service rules')}</AppLink>
          </li>
          <li>
            <AppLink to={getRouteMain()}>{t('Privacy Policy')}</AppLink>
          </li>
        </VStack>
      </Container>
    </Card>
  );
});
