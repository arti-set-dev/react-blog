import React, {
  InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Text, TextSize, TextTheme } from '../Text/Text';
import cl from './Input.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
  'value' | 'onChange' | 'readOnly'
>;

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
  textarea?: boolean;
}

/**
 * Outdated, use the component from the Redesigned folder
 * @deprecated
 */
export const Input = memo((props: InputProps) => {
  const {
    className,
    value = '',
    onChange,
    placeholder,
    type = InputType.TEXT,
    theme = InputTheme.INVERTED,
    autofocus,
    readonly,
    isNumeric,
    textarea,
    error,
    ...otherProps
  } = props;
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef?.current?.value !== '') {
      setIsFocus(true);
    }
  }, [inputRef?.current?.value]);

  const onFocus = () => {
    setIsFocus(true);
  };

  const onBlur = () => {
    if (inputRef?.current?.value === '') {
      setIsFocus(false);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  const mods: Mods = {
    [cl.focused]: isFocus,
    [cl.readonly]: readonly,
    [cl.error]: !!error,
    [cl.textarea]: textarea,
  };

  if (textarea) {
    return (
      <div className={cl.InputWrapper}>
        {placeholder && (
          <span className={classNames(cl.InputPlaceholder, mods, [className, cl[theme]])}>
            {placeholder}
          </span>
        )}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChangeHandler}
          onFocus={onFocus}
          onBlur={onBlur}
          className={classNames(cl.Input, mods, [className, cl[theme]])}
          readOnly={readonly}
          {...otherProps}
        />
        {error && (
          <Text data-testid="Input.Error" size={TextSize.S} theme={TextTheme.ERROR} className={cl.ErrorMessage}>
            {error}
          </Text>
        )}
      </div>
    );
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {placeholder ? (
        <div className={cl.InputWrapper}>
          <span
            className={classNames(cl.InputPlaceholder, mods, [
              className,
              cl[theme],
            ])}
          >
            {placeholder}
          </span>
          <input
            ref={inputRef}
            type={type}
            value={value}
            onChange={onChangeHandler}
            onFocus={onFocus}
            onBlur={onBlur}
            className={classNames(cl.Input, mods, [className, cl[theme]])}
            readOnly={readonly}
            {...otherProps}
          />
          {error && (
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
      ) : (
        <div className={cl.InputWrapper}>
          <input
            type={type}
            value={value}
            onChange={onChangeHandler}
            className={classNames(cl.Input, {}, [className])}
            {...otherProps}
          />
          {error && (
            <Text
              size={TextSize.S}
              className={cl.ErrorMessage}
              theme={TextTheme.ERROR}
            >
              {error}
            </Text>
          )}
        </div>
      )}
    </>
  );
});
