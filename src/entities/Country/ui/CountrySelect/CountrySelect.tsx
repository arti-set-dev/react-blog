import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeatures } from '@/shared/lib/features';
import { Listbox } from '@/shared/ui/redesigned/Popups';
import { Listbox as ListboxDeprecated } from '@/shared/ui/deprecated/Popups';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
  className?: string;
  currValue?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  { value: Country.Germany, content: Country.Germany },
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
  { value: Country.USA, content: Country.USA },
];

export const CountrySelect = memo((props: CountrySelectProps) => {
  const {
    className, currValue, onChange, readonly,
  } = props;
  const { t } = useTranslation();

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Country);
    },
    [onChange],
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <Listbox
          variant="outline"
          readonly={readonly}
          value={currValue}
          onChange={onChangeHandler}
          label={t('Your Country')}
          items={options}
        />
      )}
      off={(
        <ListboxDeprecated
          readonly={readonly}
          value={currValue}
          onChange={onChangeHandler}
          label={t('Your Country')}
          items={options}
        />
      )}
    />
  );
});
