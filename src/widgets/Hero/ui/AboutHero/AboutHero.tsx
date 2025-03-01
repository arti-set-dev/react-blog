import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import { getHstack } from '@/shared/lib/stack/getHstack/getHstack';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface AboutHeroProps {
  className?: string;
}

export const AboutHero = memo((props: AboutHeroProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Card
      offset="24"
      tag="section"
      className={classNames(getHstack({ gap: 16, justify: 'center' }))}
    >
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
    </Card>
  );
});
