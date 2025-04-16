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
  const emailAddress = 'privacy@netowork.com';

  const renderSection = (
    id: string,
    title: string,
    texts: string | string[],
    items?: string[],
    subSections?: Record<string, any>,
    note?: string,
  ) => {
    const textArray = Array.isArray(texts) ? texts : [texts];
    const sectionStyle = {
      paddingTop: '16px',
      marginTop: '16px',
    };

    return (
      <VStack tag="section" gap="16" id={id} style={sectionStyle}>
        <Text tag="h2" weight="bold" size="xl">{title}</Text>
        {textArray.map((text, index) => (
          <Text key={index} tag="p" weight="normal" size="l">{text}</Text>
        ))}

        {items && (
          <VStack tag="ul" gap="8">
            {items.map((item, index) => (
              <HStack gap="4" listVariant="marker" tag="li" key={index}>{item}</HStack>
            ))}
          </VStack>
        )}

        {subSections && Object.entries(subSections).map(([key, value]: [string, any]) => (
          <VStack key={key} tag="section" gap="8">
            <Text tag="h3" weight="bold" size="l">{value.title}</Text>
            <Text tag="p" weight="normal" size="m">{value.text}</Text>
            {value.items && (
              <VStack tag="ul" gap="8">
                {value.items.map((item: string, index: number) => (
                  <HStack gap="4" listVariant="marker" tag="li" key={index}>{item}</HStack>
                ))}
              </VStack>
            )}
            {value.note && <Text tag="p" weight="normal" size="s">{value.note}</Text>}
          </VStack>
        ))}

        {note && <Text tag="p" weight="normal" size="s">{note}</Text>}
      </VStack>
    );
  };

  const policyContent = (
    <VStack gap="16">
      <Card offset="24" tag="div" width="100%" className={getVstack({ align: 'center', justify: 'center', gap: 24 })}>
        <Text tag="h1" weight="bold" size="xl" variant="primary-light">{t('title')}</Text>
        <Text tag="p" size="m">{t('effective_date')}</Text>
      </Card>

      <Card offset="24" tag="div" className={getVstack({ gap: 24 })}>
        {/* General Provisions */}
        {renderSection(
          'general',
          t('general.title'),
          [t('general.text1'), t('general.text2'), t('general.text3'), t('general.text4')],
        )}

        {/* Legal Basis for Processing */}
        {renderSection(
          'legal-basis',
          t('legal_basis.title'),
          [t('legal_basis.text1'), t('legal_basis.text2')],
          t('legal_basis.items', { returnObjects: true }) as string[],
        )}

        {/* Data Collection */}
        {renderSection(
          'data-collection',
          t('data_collection.title'),
          t('data_collection.text'),
          undefined,
          t('data_collection.categories', { returnObjects: true }) as Record<string, any>,
        )}

        {/* Collection Methods */}
        {renderSection(
          'data-collection-methods',
          t('data_collection.collection_methods.title'),
          t('data_collection.collection_methods.text'),
          t('data_collection.collection_methods.items', { returnObjects: true }) as string[],
        )}

        {/* Purposes of Processing */}
        {renderSection(
          'data-processing-purposes',
          t('data_collection.purposes.title'),
          t('data_collection.purposes.text'),
          t('data_collection.purposes.items', { returnObjects: true }) as string[],
        )}

        {/* Data Sharing */}
        {renderSection(
          'data-sharing',
          t('data_sharing.title'),
          t('data_sharing.text'),
          undefined,
          t('data_sharing.categories', { returnObjects: true }) as Record<string, any>,
        )}

        {/* International Transfers */}
        {renderSection(
          'international-transfers',
          t('international_transfers.title'),
          [t('international_transfers.text1'), t('international_transfers.text2'), t('international_transfers.text3')],
          t('international_transfers.items', { returnObjects: true }) as string[],
        )}

        {/* Data Protection */}
        {renderSection(
          'data-protection',
          t('data_protection.title'),
          t('data_protection.text1'),
          t('data_protection.items', { returnObjects: true }) as string[],
          undefined,
          t('data_protection.text2'),
        )}

        {/* Data Retention */}
        {renderSection(
          'data-retention',
          t('data_retention.title'),
          [t('data_retention.text1'), t('data_retention.text2'), t('data_retention.text3')],
          t('data_retention.items', { returnObjects: true }) as string[],
        )}

        {/* Cookies */}
        {renderSection(
          'cookies',
          t('cookies.title'),
          [t('cookies.text1'), t('cookies.text2'), t('cookies.text3')],
          undefined,
          t('cookies.categories', { returnObjects: true }) as Record<string, any>,
        )}

        {/* Your Rights */}
        {renderSection(
          'rights',
          t('rights.title'),
          [t('rights.text1'), t('rights.text2'), t('rights.text3')],
          t('rights.items', { returnObjects: true }) as string[],
        )}

        {/* Children's Privacy */}
        {renderSection(
          'children',
          t('children.title'),
          [t('children.text1'), t('children.text2')],
        )}

        {/* Changes to the Policy */}
        {renderSection(
          'changes',
          t('changes.title'),
          [t('changes.text1'), t('changes.text2'), t('changes.text3')],
        )}

        {/* Dispute Resolution */}
        {renderSection(
          'dispute-resolution',
          t('dispute_resolution.title'),
          [t('dispute_resolution.text1'), t('dispute_resolution.text2')],
        )}

        {/* California Residents */}
        {renderSection(
          'california-residents',
          t('california_residents.title'),
          [t('california_residents.text1'), t('california_residents.text2'), t('california_residents.text3')],
          t('california_residents.items', { returnObjects: true }) as string[],
        )}

        {/* EEA Residents */}
        {renderSection(
          'eea-residents',
          t('eea_residents.title'),
          [t('eea_residents.text1'), t('eea_residents.text2'), t('eea_residents.text3')],
          t('eea_residents.items', { returnObjects: true }) as string[],
        )}

        {/* Contact Us */}
        <VStack tag="section" gap="16" id="contacts">
          <Text tag="h2" weight="bold" size="xl">{t('contacts.title')}</Text>
          <Text tag="p" weight="normal" size="l">{t('contacts.text1')}</Text>
          <VStack gap="8">
            <Text tag="p" weight="normal" size="m">{t('contacts.email')}</Text>
            <Text tag="p" weight="normal" size="m">{t('contacts.phone')}</Text>
            <Text tag="p" weight="normal" size="m">{t('contacts.address')}</Text>
            <Text tag="p" weight="normal" size="m">{t('contacts.form')}</Text>
          </VStack>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <AppLink variant="primary-light" to={`mailto:${emailAddress}`}>{emailAddress}</AppLink>
        </VStack>
      </Card>
    </VStack>
  );

  const policyContentDeprecated = (
    <VStack gap="16">
      <Card
        border="0"
        offset="24"
        tag="div"
        width="100%"
        className={getVstack({ align: 'center', justify: 'center', gap: 24 })}
      >
        <Text tag="h1" weight="bold" size="xl" variant="primary-light">{t('title')}</Text>
        <Text tag="p" size="m">{t('effective_date')}</Text>
      </Card>

      <Card
        border="0"
        offset="24"
        tag="div"
        className={getVstack({ gap: 24 })}
      >
        {/* General Provisions */}
        {renderSection(
          'general',
          t('general.title'),
          [t('general.text1'), t('general.text2'), t('general.text3'), t('general.text4')],
        )}

        {/* Legal Basis for Processing */}
        {renderSection(
          'legal-basis',
          t('legal_basis.title'),
          [t('legal_basis.text1'), t('legal_basis.text2')],
          t('legal_basis.items', { returnObjects: true }) as string[],
        )}

        {/* Data Collection */}
        {renderSection(
          'data-collection',
          t('data_collection.title'),
          t('data_collection.text'),
          undefined,
          t('data_collection.categories', { returnObjects: true }) as Record<string, any>,
        )}

        {/* Collection Methods */}
        {renderSection(
          'data-collection-methods',
          t('data_collection.collection_methods.title'),
          t('data_collection.collection_methods.text'),
          t('data_collection.collection_methods.items', { returnObjects: true }) as string[],
        )}

        {/* Purposes of Processing */}
        {renderSection(
          'data-processing-purposes',
          t('data_collection.purposes.title'),
          t('data_collection.purposes.text'),
          t('data_collection.purposes.items', { returnObjects: true }) as string[],
        )}

        {/* Data Sharing */}
        {renderSection(
          'data-sharing',
          t('data_sharing.title'),
          t('data_sharing.text'),
          undefined,
          t('data_sharing.categories', { returnObjects: true }) as Record<string, any>,
        )}

        {/* International Transfers */}
        {renderSection(
          'international-transfers',
          t('international_transfers.title'),
          [t('international_transfers.text1'), t('international_transfers.text2'), t('international_transfers.text3')],
          t('international_transfers.items', { returnObjects: true }) as string[],
        )}

        {/* Data Protection */}
        {renderSection(
          'data-protection',
          t('data_protection.title'),
          t('data_protection.text1'),
          t('data_protection.items', { returnObjects: true }) as string[],
          undefined,
          t('data_protection.text2'),
        )}

        {/* Data Retention */}
        {renderSection(
          'data-retention',
          t('data_retention.title'),
          [t('data_retention.text1'), t('data_retention.text2'), t('data_retention.text3')],
          t('data_retention.items', { returnObjects: true }) as string[],
        )}

        {/* Cookies */}
        {renderSection(
          'cookies',
          t('cookies.title'),
          [t('cookies.text1'), t('cookies.text2'), t('cookies.text3')],
          undefined,
          t('cookies.categories', { returnObjects: true }) as Record<string, any>,
        )}

        {/* Your Rights */}
        {renderSection(
          'rights',
          t('rights.title'),
          [t('rights.text1'), t('rights.text2'), t('rights.text3')],
          t('rights.items', { returnObjects: true }) as string[],
        )}

        {/* Children's Privacy */}
        {renderSection(
          'children',
          t('children.title'),
          [t('children.text1'), t('children.text2')],
        )}

        {/* Changes to the Policy */}
        {renderSection(
          'changes',
          t('changes.title'),
          [t('changes.text1'), t('changes.text2'), t('changes.text3')],
        )}

        {/* Dispute Resolution */}
        {renderSection(
          'dispute-resolution',
          t('dispute_resolution.title'),
          [t('dispute_resolution.text1'), t('dispute_resolution.text2')],
        )}

        {/* California Residents */}
        {renderSection(
          'california-residents',
          t('california_residents.title'),
          [t('california_residents.text1'), t('california_residents.text2'), t('california_residents.text3')],
          t('california_residents.items', { returnObjects: true }) as string[],
        )}

        {/* EEA Residents */}
        {renderSection(
          'eea-residents',
          t('eea_residents.title'),
          [t('eea_residents.text1'), t('eea_residents.text2'), t('eea_residents.text3')],
          t('eea_residents.items', { returnObjects: true }) as string[],
        )}

        {/* Contact Us */}
        <VStack tag="section" gap="16" id="contacts">
          <Text tag="h2" weight="bold" size="xl">{t('contacts.title')}</Text>
          <Text tag="p" weight="normal" size="l">{t('contacts.text1')}</Text>
          <VStack gap="8">
            <Text tag="p" weight="normal" size="m">{t('contacts.email')}</Text>
            <Text tag="p" weight="normal" size="m">{t('contacts.phone')}</Text>
            <Text tag="p" weight="normal" size="m">{t('contacts.address')}</Text>
            <Text tag="p" weight="normal" size="m">{t('contacts.form')}</Text>
          </VStack>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <AppLink variant="primary-light" to={`mailto:${emailAddress}`}>{emailAddress}</AppLink>
        </VStack>
      </Card>
    </VStack>
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={policyContent}
      off={(
        <Container max>
          {policyContentDeprecated}
        </Container>
      )}
    />
  );
});
