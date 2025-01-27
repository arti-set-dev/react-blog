import { Popover as HPopover } from '@headlessui/react';
import { ReactNode } from 'react';
import { DropdownDirection } from '@/shared/const/ui';
import { classNames } from '@/shared/lib/classNames/classNames';
import { mapDirectionClass } from '../../styles/consts';
import cl from './Popover.module.scss';
import popupCl from '../../styles/Popups.module.scss';

interface HPopoverProps {
  className?: string;
  trigger: ReactNode;
  direction?: DropdownDirection;
  children: ReactNode;
}

export const Popover = (props: HPopoverProps) => {
  const {
    className, trigger, direction = 'bottom left', children,
  } = props;

  const popoverClasses = [mapDirectionClass[direction]];

  return (
    <HPopover className={classNames(cl.Popover, {}, [])}>
      <HPopover.Button as="div" className={popupCl.Trigger}>{trigger}</HPopover.Button>
      <HPopover.Panel className={classNames(cl.Panel, {}, popoverClasses)}>
        {children}
      </HPopover.Panel>
    </HPopover>
  );
};
