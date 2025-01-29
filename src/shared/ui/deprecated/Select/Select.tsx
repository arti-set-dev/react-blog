import { ChangeEvent, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cl from './Select.module.scss';

export interface SelectOptions<T extends string> {
  value: T;
  content: string;
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOptions<T>[];
  currValue?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
}

/**
 * Outdated, use the component from the Redesigned folder
 * @deprecated
 */
export const Select = <T extends string>(props: SelectProps<T>) => {
  const {
    className, label, options, currValue, onChange, readonly,
  } = props;

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T);
  };

  const mods: Mods = {
    [cl.readonly]: readonly,
  };

  const optionList = useMemo(
    () => options?.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.content}
      </option>
    )),
    [options],
  );

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {label ? (
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
      ) : (
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
};
