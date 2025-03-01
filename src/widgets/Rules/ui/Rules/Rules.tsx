import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeatures } from '@/shared/lib/features';
import { RulesRedesigned } from './RulesRedesigned/RulesRedesigned';
import { RulesDeprecated } from './RulesDeprecated/RulesDeprecated';

interface RulesProps {
    className?: string;
}

export const Rules = memo((props: RulesProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <RulesRedesigned />
      )}
      off={(
        <RulesDeprecated />
      )}
    />
  );
});
