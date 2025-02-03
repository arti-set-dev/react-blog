import React, {
  InputHTMLAttributes,
  memo,
  useEffect,
  useRef,
  useState, ReactNode,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Text } from '../Text/Text';
import cl from './Input.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

export type InputType = 'text' | 'password' | 'number';

export type InputVariant = 'inverted' | 'outlined';
export type InputBackground = 'transparent' | 'light';

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: InputType;
  variant?: InputVariant;
  autofocus?: boolean;
  readonly?: boolean;
  isNumeric?: boolean;
  error?: string;
  addon?: ReactNode;
  background?: InputBackground;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value = '',
    onChange,
    placeholder,
    type = 'text',
    variant = 'inverted',
    autofocus,
    readonly,
    isNumeric,
    error,
    addon,
    background = 'transparent',
    ...otherProps
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

  const addonContent = (
    <div className={cl.Addon}>
      {addon}
    </div>
  );

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {placeholder ? (
        <div className={cl.InputWrapper}>
          {addon && addonContent}
          <span
            className={classNames(cl.InputPlaceholder, mods, [
              className,
              cl[variant],
              cl[background],
            ])}
          >
            {placeholder}
          </span>
          <input
            ref={inputRef}
            type={type}
            value={value}
            onChange={onChangeHandler}
            onFocus={onFoucus}
            onBlur={onBlur}
            className={classNames(cl.Input, mods, [className, cl[variant]])}
            readOnly={readonly}
            {...otherProps}
          />
          {error && (
            <Text
              data-testid="Input.Error"
              size="s"
              className={cl.ErrorMessage}
              variant="error"
            >
              {error}
            </Text>
          )}
        </div>
      ) : (
        <div className={cl.InputWrapper}>
          {addon && addonContent}
          <input
            type={type}
            value={value}
            onChange={() => onChange?.(value)}
            className={classNames(cl.Input, {}, [className])}
            {...otherProps}
          />
          {error && (
            <Text
              size="s"
              className={cl.ErrorMessage}
              variant="error"
            >
              {error}
            </Text>
          )}
        </div>
      )}
    </>
  );
});
