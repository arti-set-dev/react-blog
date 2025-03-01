import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeatures } from '@/shared/lib/features';
import { AboutHeroRedesigned } from './AboutHeroRedesigned/AboutHeroRedesigned';
import { AboutHeroDeprecated } from './AboutHeroDeprecated/AboutHeroDeprecated';

interface AboutHeroProps {
  className?: string;
}

export const AboutHero = memo((props: AboutHeroProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <AboutHeroRedesigned />
      )}
      off={(
        <AboutHeroDeprecated />
      )}
    />
  );
});
