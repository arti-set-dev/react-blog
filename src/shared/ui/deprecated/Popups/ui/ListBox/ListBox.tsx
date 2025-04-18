import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './ListBox.module.scss';
import popupCl from '../../styles/Popups.module.scss';

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps {
  items?: ListBoxItem[];
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  readonly?: boolean;
  label?: string;
}

/**
 * Outdated, use the component from the Redesigned folder
 * @deprecated
 */
export const Listbox = (props: ListBoxProps) => {
  const {
    className, items, value, defaultValue, onChange, readonly, label,
  } = props;

  return (
    <HListBox
      disabled={readonly}
      as="div"
      className={classNames(popupCl.Popup, {}, [className])}
      value={value}
      onChange={onChange}
    >
      <HListBox.Button className={cl.Trigger}>
        {label && <span className={cl.Label}>{label}</span>}
        {value ?? defaultValue}
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
                className={classNames('', {
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
