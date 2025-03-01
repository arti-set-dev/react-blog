import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { Card } from '@/shared/ui/redesigned/Card';
import { LazyImage } from '@/shared/ui/redesigned/LazyImage';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface RulesRedesignedProps {
    className?: string;
}

export const RulesRedesigned = memo((props: RulesRedesignedProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Card offset="24" className={getVstack({ gap: 24 })}>
      <Text
        tag="h2"
        variant="primary"
        weight="bold"
        size="xl"
      >
        {t('Publication rules')}
      </Text>
      <HStack tag="ul" gap="16" justify="between" align="start">
        <VStack flexBasis="33%" tag="li" gap="16" align="center">
          <VStack align="center" width="325px" gap="16">
            <Text weight="bold" size="l" align="center">{t('Rule 1')}</Text>
            <Text align="center">{t('Rule desc 1')}</Text>
          </VStack>
          <LazyImage height={300} alt="" aria-hidden src="/rule-Image-1.svg" />
        </VStack>
        <VStack flexBasis="33%" tag="li" gap="16" align="center">
          <VStack align="center" width="325px" gap="16">
            <Text weight="bold" size="l" align="center">{t('Rule 2')}</Text>
            <Text align="center">{t('Rule desc 2')}</Text>
          </VStack>
          <LazyImage height={300} alt="" aria-hidden src="/rule-Image-2.svg" />
        </VStack>
        <VStack flexBasis="33%" tag="li" gap="16" align="center">
          <VStack align="center" width="325px" gap="16">
            <Text weight="bold" size="l" align="center">{t('Rule 3')}</Text>
            <Text align="center">{t('Rule desc 3')}</Text>
          </VStack>
          <LazyImage height={300} alt="" aria-hidden src="/rule-Image-3.svg" />
        </VStack>
      </HStack>
    </Card>
  );
});
