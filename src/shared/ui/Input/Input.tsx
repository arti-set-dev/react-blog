import React, {
  FC, InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cl from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

export enum InputType {
  TEXT = 'text',
  PASSWORD = 'password',
  NUMBER = 'number',
}

export enum InputTheme {
  LINE_INVERTED = 'line-inverted',
}

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    type?: InputType;
    theme?: InputTheme;
    autofocus?: boolean;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange, placeholder, type = InputType.TEXT, theme = InputTheme.LINE_INVERTED, autofocus, ...otherProps
  } = props;
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFoucus = () => {
    setIsFocus(true);
  };

  const onBlur = () => {
    if (inputRef.current.value === '') {
      setIsFocus(false);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const mods: Record<string, boolean> = {
    [cl.focused]: isFocus,
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
              className={classNames(cl.Input, {}, [className, cl[theme]])}
              {...otherProps}
            />
          </div>
        )
        : (
          <input
            type={type}
            value={value}
            onChange={() => onChange(value)}
            className={classNames(cl.Input, {}, [className])}
            {...otherProps}
          />
        )}
    </>
  );
});
