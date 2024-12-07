import { Country } from 'entitie/Country';
import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';

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

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country);
  }, [onChange]);

  return (
    <Select
      readonly={readonly}
      currValue={currValue}
      onChange={onChangeHandler}
      label={t('Your Country')}
      options={options}
    />
  );
});
