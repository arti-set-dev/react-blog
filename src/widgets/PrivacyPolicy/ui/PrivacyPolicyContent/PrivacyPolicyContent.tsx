import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { getVstack } from '@/shared/lib/stack/getVstack/getVstack';
import { Button } from '@/shared/ui/redesigned/Button';

interface PrivacyPolicyContentProps {
  className?: string;
}

export const PrivacyPolicyContent = memo((props: PrivacyPolicyContentProps) => {
  const { className } = props;
  const { t } = useTranslation('privacy-policy');

  useEffect(() => {
    const originalPadding = document.documentElement.style.scrollPaddingTop;

    document.documentElement.style.scrollPaddingTop = '80px';

    return () => {
      document.documentElement.style.scrollPaddingTop = originalPadding;
    };
  }, []);

  const sections = [
    { id: 'general', title: t('general.title') },
    { id: 'legal-basis', title: t('legal_basis.title') },
    { id: 'data-collection', title: t('data_collection.title') },
    { id: 'data-collection-methods', title: t('data_collection.collection_methods.title'), isSubsection: true },
    { id: 'data-processing-purposes', title: t('data_collection.purposes.title'), isSubsection: true },
    { id: 'data-sharing', title: t('data_sharing.title') },
    { id: 'international-transfers', title: t('international_transfers.title') },
    { id: 'data-protection', title: t('data_protection.title') },
    { id: 'data-retention', title: t('data_retention.title') },
    { id: 'cookies', title: t('cookies.title') },
    { id: 'rights', title: t('rights.title') },
    { id: 'children', title: t('children.title') },
    { id: 'changes', title: t('changes.title') },
    { id: 'dispute-resolution', title: t('dispute_resolution.title') },
    { id: 'contacts', title: t('contacts.title') },
    { id: 'california-residents', title: t('california_residents.title') },
    { id: 'eea-residents', title: t('eea_residents.title') },
  ];

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <Card offset="16" className={className}>
      <VStack gap="16">
        <Text tag="h2" size="l" weight="bold">{t('table_of_contents')}</Text>

        <VStack gap="16">
          <VStack gap="8" className={getVstack({ align: 'start' })}>
            {sections.map((section) => (
              <Button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                variant="text-light"
                align="left"
              >
                {section.title}
              </Button>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </Card>
  );
});
