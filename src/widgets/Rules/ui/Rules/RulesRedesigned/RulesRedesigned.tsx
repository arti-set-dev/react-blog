import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { Card } from '@/shared/ui/redesigned/Card';
import { LazyImage } from '@/shared/ui/redesigned/LazyImage';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { RulesProps } from '../Rules';

export const RulesRedesigned = memo((props: RulesProps) => {
  const { className, isHead } = props;
  const { t } = useTranslation();

  return (
    <Card tag="section" offset="24" className={getVstack({ gap: 24 })}>
      <Text
        tag={isHead ? 'h1' : 'h2'}
        variant="primary"
        weight="bold"
        size="xl"
      >
        {t('Publication rules')}
      </Text>
      <HStack tag="ul" gap="16" justify="between" align="start">
        <VStack flexBasis="33%" tag="li" gap="16" align="center">
          <VStack align="center" width="325px" gap="16">
            <Text weight="bold" size="l" align="center" style={{ minHeight: '50px' }}>{t('Rule 1')}</Text>
            <Text align="center" style={{ minHeight: '28px' }}>{t('Rule desc 1')}</Text>
          </VStack>
          <LazyImage height={300} alt="" aria-hidden src="/images/rule-Image-1.svg" />
        </VStack>
        <VStack flexBasis="33%" tag="li" gap="16" align="center">
          <VStack align="center" width="325px" gap="16">
            <Text weight="bold" size="l" align="center" style={{ minHeight: '50px' }}>{t('Rule 2')}</Text>
            <Text align="center" style={{ minHeight: '28px' }}>{t('Rule desc 2')}</Text>
          </VStack>
          <LazyImage height={300} alt="" aria-hidden src="/images/rule-Image-2.svg" />
        </VStack>
        <VStack flexBasis="33%" tag="li" gap="16" align="center">
          <VStack align="center" width="325px" gap="16">
            <Text weight="bold" size="l" align="center" style={{ minHeight: '50px' }}>{t('Rule 3')}</Text>
            <Text align="center" style={{ minHeight: '28px' }}>{t('Rule desc 3')}</Text>
          </VStack>
          <LazyImage height={300} alt="" aria-hidden src="/images/rule-Image-3.svg" />
        </VStack>
      </HStack>
    </Card>
  );
});
