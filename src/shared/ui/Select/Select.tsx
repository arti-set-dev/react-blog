import {
  ChangeEvent, FC, memo, useMemo,
} from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cl from './Select.module.scss';

export interface SelectOptions {
    value: string;
    content: string;
}

interface SelectProps {
    className?: string;
    label?: string;
    options: SelectOptions[];
    currValue?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
}

export const Select = memo((props: SelectProps) => {
  const {
    className, label, options, currValue, onChange, readonly,
  } = props;

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  const mods: Mods = {
    [cl.readonly]: readonly,
  };

  const optionList = useMemo(() => options?.map((opt) => (
    <option
      key={opt.value}
      value={opt.value}
    >
      {opt.content}
    </option>
  )), [options]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {label
        ? (
          <div className={cl.SelectWrapper}>
            <span className={cl.Label}>{label}</span>
            <select
              value={currValue}
              disabled={readonly}
              onChange={onChangeHandler}
              className={classNames(cl.Select, mods, [className])}
            >
              {optionList}
            </select>
          </div>

        )
        : (
          <select
            disabled={readonly}
            onChange={onChangeHandler}
            className={classNames(cl.Select, mods, [className])}
          >
            {optionList}
          </select>
        )}
    </>
  );
});
