import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getHstack } from '@/shared/lib/stack/getHstack/getHstack';
import { Text } from '@/shared/ui/redesigned/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { Container } from '@/shared/ui/redesigned/Container';

interface AboutHeroDeprecatedProps {
  className?: string;
}

export const AboutHeroDeprecated = memo((props: AboutHeroDeprecatedProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Card
      variant="transparent"
      offset="0"
      tag="section"
      className={classNames(getHstack({ gap: 16, justify: 'center' }))}
    >
      <Container>
        <Text tag="h1" className="visually-hidden">{t('About Page')}</Text>
        <VStack gap="16" align="center">
          <Card offset="0" tag="div" variant="transparent">
            <Text tag="strong" variant="primary-light" weight="bold" size="l">{t('Netowork')}</Text>
            <Text tag="span" size="l">{t('About desc 1')}</Text>
          </Card>
          <Text size="l">
            {t('About desc 2')}
          </Text>
        </VStack>
      </Container>
    </Card>
  );
});
