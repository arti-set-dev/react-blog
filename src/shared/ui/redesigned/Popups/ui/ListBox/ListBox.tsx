import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { Icon } from '../../../Icon/Icon';
import { getHstack } from '@/shared/lib/stack/getHstack/getHstack';
import { classNames } from '@/shared/lib/classNames/classNames';
import ArrIcon from '@/shared/assets/icons/arrow-icon.svg';
import cl from './ListBox.module.scss';
import popupCl from '../../styles/Popups.module.scss';

export type ListBoxVariant = 'primary' | 'outline';
export type ListBoxBackground = 'light' | 'dark';

export interface ListBoxItem<T extends string> {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps<T extends string> {
  items?: ListBoxItem<T>[];
  className?: string;
  value?: T;
  defaultValue?: string;
  onChange: (value: T) => void;
  readonly?: boolean;
  label?: string;
  background?: ListBoxBackground;
  variant?: ListBoxVariant;
  width?: number | string
}

export const Listbox = <T extends string>(props: ListBoxProps<T>) => {
  const {
    className, items, value, defaultValue, onChange, readonly, label, variant = 'primary', background = '', width,
  } = props;

  return (
    <HListBox
      disabled={readonly}
      as="div"
      className={classNames(popupCl.Popup, {}, [className])}
      value={value}
      style={{ maxWidth: width }}
      onChange={onChange}
    >
      <HListBox.Button
        className={classNames(cl.Trigger, {}, [
          className,
          getHstack({ gap: 4, align: 'center' }),
          cl[variant], cl[background]])}
      >
        {label && <span className={cl.Label}>{label}</span>}
        {value ?? defaultValue}
        <Icon width={10} height={10} Svg={ArrIcon} />
      </HListBox.Button>
      <HListBox.Options className={cl.Options}>
        {items?.map((item) => (
          <HListBox.Option
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            as={Fragment}
          >
            {({ active, selected }) => (
              <li
                className={classNames(cl.Option, {
                  [cl.active]: active,
                  [cl.disabled]: item.disabled,
                })}
              >
                {selected && '>'}
                {item.content}
              </li>
            )}
          </HListBox.Option>
        ))}
      </HListBox.Options>
    </HListBox>
  );
};
