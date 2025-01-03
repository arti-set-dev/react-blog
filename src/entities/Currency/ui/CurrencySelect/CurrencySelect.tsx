import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Listbox } from '@/shared/ui/Popups';
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

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency);
  }, [onChange]);

  return (
    <Listbox
      className={className}
      value={currValue}
      defaultValue={t('Indicate the currency')}
      items={options}
      onChange={onChangeHandler}
      readonly={readonly}
      label={t('Your Currency')}
    />
  );
});
