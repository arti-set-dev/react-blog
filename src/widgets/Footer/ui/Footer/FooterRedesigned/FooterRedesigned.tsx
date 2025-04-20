import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { getRouteMain, getRoutePrivacyPolicy, getRouteServiceRules } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import LogoIcon from '@/shared/assets/icons/logo.svg';
import { Text } from '@/shared/ui/redesigned/Text';
import { getHstack } from '@/shared/lib/stack/getHstack/getHstack';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Container } from '@/shared/ui/redesigned/Container';
import { Flex } from '@/shared/ui/redesigned/Stack/Flex/Flex';

interface FooterRedesignedProps {
    className?: string;
    itemsList: ReactNode[];
}

export const FooterRedesigned = memo((props: FooterRedesignedProps) => {
  const { className, itemsList } = props;
  const { t } = useTranslation();

  return (
    <Container max>
      <Card
        max
        maxWidth="calc(var(--container-width))"
        tag="footer"
        offset="24"
        className={classNames('', {}, [className, getHstack({
          gap: 16,
          justify: 'between',
        })])}
      >
        <Flex flexWrap="wrap" direction="initial" align="start" justify="between" gap="32" fullWidth width={400}>
          <VStack gap="16">
            <AppLink to={getRouteMain()}>
              <Icon color="primary" width="100%" height={30} Svg={LogoIcon} />
            </AppLink>
            <VStack width="140px">
              <Text>{t('Copyright')}</Text>
            </VStack>
          </VStack>
          <VStack tag="ul" gap="16">
            {itemsList}
          </VStack>
        </Flex>
        <VStack tag="ul" gap="16">
          <li>
            <AppLink to={getRouteServiceRules()}>{t('Service rules')}</AppLink>
          </li>
          <li>
            <AppLink to={getRoutePrivacyPolicy()}>{t('Privacy Policy')}</AppLink>
          </li>
        </VStack>
      </Card>
    </Container>
  );
});
