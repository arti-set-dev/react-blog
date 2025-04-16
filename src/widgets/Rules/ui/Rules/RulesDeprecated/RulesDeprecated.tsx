import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '@/shared/ui/redesigned/Container';
import { Card } from '@/shared/ui/redesigned/Card';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { LazyImage } from '@/shared/ui/redesigned/LazyImage';
import { RulesProps } from '../Rules';

export const RulesDeprecated = memo((props: RulesProps) => {
  const { className, isHead } = props;
  const { t } = useTranslation();

  return (
    <Card tag="section" variant="transparent" border="0" offset="24">
      <Container className={getVstack({ gap: 24 })}>
        <Text
          tag={isHead ? 'h1' : 'h2'}
          variant="primary"
          weight="bold"
          size="xl"
        >
          {t('Publication rules')}
        </Text>
        <HStack tag="ul" gap="16" justify="between" align="stretch">
          <Card border="0" flexBasis="33%" offset="16" tag="li" className={getVstack({ gap: 16, align: 'center' })}>
            <VStack align="center" width="325px" gap="16">
              <Text weight="bold" size="l" align="center" style={{ minHeight: '50px' }}>{t('Rule 1')}</Text>
              <Text align="center" style={{ minHeight: '28px' }}>{t('Rule desc 1')}</Text>
            </VStack>
            <LazyImage height={300} alt="" aria-hidden src="/images/rule-Image-1.svg" />
          </Card>
          <Card border="0" flexBasis="33%" offset="16" tag="li" className={getVstack({ gap: 16, align: 'center' })}>
            <VStack align="center" width="325px" gap="16">
              <Text weight="bold" size="l" align="center" style={{ minHeight: '50px' }}>{t('Rule 2')}</Text>
              <Text align="center" style={{ minHeight: '28px' }}>{t('Rule desc 2')}</Text>
            </VStack>
            <LazyImage height={300} alt="" aria-hidden src="/images/rule-Image-2.svg" />
          </Card>
          <Card border="0" flexBasis="33%" offset="16" tag="li" className={getVstack({ gap: 16, align: 'center' })}>
            <VStack align="center" width="325px" gap="16">
              <Text weight="bold" size="l" align="center" style={{ minHeight: '50px' }}>{t('Rule 3')}</Text>
              <Text align="center" style={{ minHeight: '28px' }}>{t('Rule desc 3')}</Text>
            </VStack>
            <LazyImage height={300} alt="" aria-hidden src="/images/rule-Image-3.svg" />
          </Card>
        </HStack>
      </Container>
    </Card>
  );
});
