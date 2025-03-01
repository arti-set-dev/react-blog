import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getHstack } from '@/shared/lib/stack/getHstack/getHstack';
import { Text } from '@/shared/ui/redesigned/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';

interface AboutHeroRedesignedProps {
  className?: string;
}

export const AboutHeroRedesigned = memo((props: AboutHeroRedesignedProps) => {
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
