import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeatures } from '@/shared/lib/features';
import { RulesRedesigned } from './RulesRedesigned/RulesRedesigned';
import { RulesDeprecated } from './RulesDeprecated/RulesDeprecated';

export interface RulesProps {
    className?: string;
    isHead?: boolean;
}

export const Rules = memo((props: RulesProps) => {
  const { t } = useTranslation();

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <RulesRedesigned {...props} />
      )}
      off={(
        <RulesDeprecated {...props} />
      )}
    />
  );
});
