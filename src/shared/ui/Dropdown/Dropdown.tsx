import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Fragment } from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { DropdownDirection } from 'app/types/ui';
import cl from './Dropdown.module.scss';
import { Button } from '../Button/Button';
import { AppLink } from '../AppLink/AppLink';

export interface DropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  onclick?: () => void;
  href?: string;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  trigger: ReactNode;
  direction?: DropdownDirection;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': cl.dropdownBottomLeft,
  'bottom right': cl.dropdownBottomRight,
  'top left': cl.dropdownTopLeft,
  'top right': cl.dropdownTopRight,
};

export const Dropdown = (props: DropdownProps) => {
  const {
    className, items, trigger, direction = 'bottom left',
  } = props;

  const menuClasses = [mapDirectionClass[direction]];

  return (
    <Menu as="div" className={classNames(cl.Dropdown, {}, [className])}>
      <Menu.Button className={cl.Btn}>
        {trigger}
      </Menu.Button>
      <Menu.Items className={classNames(cl.Items, {}, menuClasses)}>
        {items.map((item, index) => {
          const content = ({ active }: {active: boolean}) => (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
              {item.href
                ? item.content
                : (
                  <button
                    onClick={item.onclick}
                    disabled={item.disabled}
                    className={classNames(cl.Item, { [cl.active]: active }, [])}
                  >
                    {item.content}
                  </button>
                )}
            </>
          );

          if (item.href) {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Menu.Item key={index} className={cl.Item} as={AppLink} to={item.href} disabled={item.disabled}>
                {content}
              </Menu.Item>
            );
          }

          return (
            // eslint-disable-next-line react/no-array-index-key
            <Menu.Item key={index} as={Fragment} disabled={item.disabled}>
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};
