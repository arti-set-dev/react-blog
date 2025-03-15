import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { Container } from '@/shared/ui/redesigned/Container';
import { AppLink } from '@/shared/ui/redesigned/AppLink';

interface PrivacyPolicyProps {
  className?: string;
}

export const PrivacyPolicy = memo((props: PrivacyPolicyProps) => {
  const { className } = props;
  const { t } = useTranslation('privacy-policy');

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <>
          <Card offset="24" tag="div" className={getVstack({ align: 'center', justify: 'center' })}>
            <Text tag="h1" weight="bold" size="xl" variant="primary-light">{t('title')}</Text>
          </Card>
          <Card offset="24" tag="div" className={getVstack({ gap: 24 })}>
            <Text tag="h2" weight="bold" size="xl">{t('general.title')}</Text>
            <Text tag="p" weight="normal" size="l">{t('general.text1')}</Text>
            <Text tag="p" weight="normal" size="l">{t('general.text2')}</Text>

            <Text tag="h2" weight="bold" size="xl">{t('data_collection.title')}</Text>
            <Text tag="p" weight="normal" size="l">{t('data_collection.text')}</Text>
            <VStack tag="ul">
              {(t('data_collection.items', { returnObjects: true }) as string[]).map((item, index) => (
                <HStack gap="4" listVariant="marker" tag="li" key={index}>{item}</HStack>
              ))}
            </VStack>

            <Text tag="h2" weight="bold" size="xl">{t('data_sharing.title')}</Text>
            <Text tag="p" weight="normal" size="l">{t('data_sharing.text')}</Text>
            <VStack tag="ul">
              {(t('data_sharing.items', { returnObjects: true }) as string[]).map((item, index) => (
                <HStack gap="4" listVariant="marker" tag="li" key={index}>{item}</HStack>
              ))}
            </VStack>

            <Text tag="h2" weight="bold" size="xl">{t('data_protection.title')}</Text>
            <Text tag="p" weight="normal" size="l">{t('data_protection.text')}</Text>

            <Text tag="h2" weight="bold" size="xl">{t('cookies.title')}</Text>
            <Text tag="p" weight="normal" size="l">{t('cookies.text')}</Text>

            <Text tag="h2" weight="bold" size="xl">{t('rights.title')}</Text>
            <Text tag="p" weight="normal" size="l">{t('rights.text1')}</Text>
            <Text tag="p" weight="normal" size="l">
              {t('rights.text2')}
              {/* eslint-disable-next-line i18next/no-literal-string */}
              <AppLink variant="primary-light" to="mailto:netowork@gmail.com">netowork@gmail.com</AppLink>
            </Text>
          </Card>
        </>
      )}
      off={(
        <Container max>
          <Card offset="24" border="0" tag="div" className={getVstack({ gap: 24 })}>
            <Text tag="h1" weight="bold" size="xl">{t('title')}</Text>

            <Text tag="h2" weight="bold" size="xl">{t('general.title')}</Text>
            <Text tag="p" weight="normal" size="l">{t('general.text1')}</Text>
            <Text tag="p" weight="normal" size="l">{t('general.text2')}</Text>

            <Text tag="h2" weight="bold" size="xl">{t('data_collection.title')}</Text>
            <Text tag="p" weight="normal" size="l">{t('data_collection.text')}</Text>
            <VStack tag="ul">
              {(t('data_collection.items', { returnObjects: true }) as string[]).map((item, index) => (
                <HStack gap="4" listVariant="marker" tag="li" key={index}>{item}</HStack>
              ))}
            </VStack>

            <Text tag="h2" weight="bold" size="xl">{t('data_sharing.title')}</Text>
            <Text tag="p" weight="normal" size="l">{t('data_sharing.text')}</Text>
            <VStack>
              {(t('data_sharing.items', { returnObjects: true }) as string[]).map((item, index) => (
                <HStack gap="4" listVariant="marker" tag="li" key={index}>{item}</HStack>
              ))}
            </VStack>

            <Text tag="h2" weight="bold" size="xl">{t('data_protection.title')}</Text>
            <Text tag="p" weight="normal" size="l">{t('data_protection.text')}</Text>

            <Text tag="h2" weight="bold" size="xl">{t('cookies.title')}</Text>
            <Text tag="p" weight="normal" size="l">{t('cookies.text')}</Text>

            <Text tag="h2" weight="bold" size="xl">{t('rights.title')}</Text>
            <Text tag="p" weight="normal" size="l">{t('rights.text1')}</Text>
            <Text tag="p" weight="normal" size="l">
              {t('rights.text2')}
              {/* eslint-disable-next-line i18next/no-literal-string */}
              <AppLink variant="primary-light" to="mailto:netowork@gmail.com">netowork@gmail.com</AppLink>
            </Text>
          </Card>
        </Container>
      )}
    />
  );
});
