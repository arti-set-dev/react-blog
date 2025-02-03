import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeatures } from '@/shared/lib/features';
import { Listbox } from '@/shared/ui/redesigned/Popups';
import { Listbox as ListboxDeprecated } from '@/shared/ui/deprecated/Popups';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
  className?: string;
  currValue?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

const options = [
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.KZT, content: Currency.KZT },
  { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const {
    className, currValue, onChange, readonly,
  } = props;
  const { t } = useTranslation();

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Currency);
    },
    [onChange],
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <Listbox
          variant="outline"
          className={className}
          value={currValue}
          defaultValue={t('Indicate the currency')}
          items={options}
          onChange={onChangeHandler}
          readonly={readonly}
          label={t('Your Currency')}
        />
      )}
      off={(
        <ListboxDeprecated
          className={className}
          value={currValue}
          defaultValue={t('Indicate the currency')}
          items={options}
          onChange={onChangeHandler}
          readonly={readonly}
          label={t('Your Currency')}
        />
      )}
    />
  );
});
