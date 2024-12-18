import { error } from 'console';
import React, {
  FC, InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Text, TextSize, TextTheme } from '../Text/Text';
import cl from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

export enum InputType {
  TEXT = 'text',
  PASSWORD = 'password',
  NUMBER = 'number',
}

export enum InputTheme {
  INVERTED = 'inverted',
}

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    type?: InputType;
    theme?: InputTheme;
    autofocus?: boolean;
    readonly?: boolean;
    isNumeric?: boolean;
    error?: string;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value = '',
    onChange,
    placeholder,
    type = InputType.TEXT, theme = InputTheme.INVERTED, autofocus, readonly, isNumeric, error, ...otherProps
  } = props;
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef?.current?.value !== '') {
      setIsFocus(true);
    }
  }, [inputRef?.current?.value]);

  const onFoucus = () => {
    setIsFocus(true);
  };

  const onBlur = () => {
    if (inputRef?.current?.value === '') {
      setIsFocus(false);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const mods: Mods = {
    [cl.focused]: isFocus,
    [cl.readonly]: readonly,
    [cl.error]: !!error,
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {placeholder
        ? (
          <div className={cl.InputWrapper}>
            <span className={classNames(cl.InputPlaceholder, mods, [className, cl[theme]])}>{placeholder}</span>
            <input
              ref={inputRef}
              type={type}
              value={value}
              onChange={onChangeHandler}
              onFocus={onFoucus}
              onBlur={onBlur}
              className={classNames(cl.Input, mods, [className, cl[theme]])}
              readOnly={readonly}
              {...otherProps}
            />
            {error
                && (
                  <Text
                    data-testid="Input.Error"
                    size={TextSize.S}
                    className={cl.ErrorMessage}
                    theme={TextTheme.ERROR}
                  >
                    {error}
                  </Text>
                )}
          </div>
        )
        : (
          <div className={cl.InputWrapper}>
            <input
              type={type}
              value={value}
              onChange={() => onChange?.(value)}
              className={classNames(cl.Input, {}, [className])}
              {...otherProps}
            />
            {error
                && <Text size={TextSize.S} className={cl.ErrorMessage} theme={TextTheme.ERROR}>{error}</Text>}
          </div>
        )}
    </>
  );
});
