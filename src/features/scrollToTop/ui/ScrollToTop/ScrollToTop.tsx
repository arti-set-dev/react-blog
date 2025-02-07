import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import TopIcon from '@/shared/assets/icons/up-arrow-icon.svg';

interface ScrollToTopProps {
  className?: string;
}

export const ScrollToTop = memo((props: ScrollToTopProps) => {
  const { className } = props;
  const { t } = useTranslation();

  const onScroll = () => {
    document.getElementById('app')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button onClick={onScroll} variant="icon">
      <Icon Svg={TopIcon} />
    </Button>
  );
});
