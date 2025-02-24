import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollToTop } from '@/features/scrollToTop';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface ScrollToolbarProps {
    className?: string;
}

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <VStack fullHeight align="center" justify="center">
      <ScrollToTop />
    </VStack>
  );
});
