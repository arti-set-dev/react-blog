import { Menu } from '@headlessui/react';
import { Fragment } from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/const/ui';
import { mapDirectionClass } from '../../styles/consts';
import cl from './Dropdown.module.scss';
import { AppLink } from '../../../AppLink/AppLink';
import popupCl from '../../styles/Popups.module.scss';

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

/**
 * Outdated, use the component from the Redesigned folder
 * @deprecated
 */
export const Dropdown = (props: DropdownProps) => {
  const {
    className, items, trigger, direction = 'bottom left',
  } = props;

  const menuClasses = [mapDirectionClass[direction]];

  return (
    <Menu as="div" className={classNames(popupCl.Popup, {}, [className])}>
      <Menu.Button className={popupCl.Trigger}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(cl.Items, {}, menuClasses)}>
        {items.map((item, index) => {
          const content = ({ active }: { active: boolean }) => (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
              {item.href ? (
                item.content
              ) : (
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
              <Menu.Item
                className={cl.Item}
                key={index}
                as={AppLink}
                to={item.href}
                disabled={item.disabled}
              >
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
