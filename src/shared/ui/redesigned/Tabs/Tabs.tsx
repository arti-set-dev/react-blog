import { memo, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FlexDirection, Flex } from '../Stack/Flex/Flex';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './Tabs.module.scss';
import { Button } from '../Button/Button';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
  direction?: FlexDirection;
}

export const Tabs = memo((props: TabsProps) => {
  const {
    className, tabs, value, onTabClick, direction = 'row',
  } = props;
  const { t } = useTranslation();

  const clickHandle = useCallback(
    (tab: TabItem) => () => {
      onTabClick(tab);
    },
    [onTabClick],
  );

  return (
    <Flex direction={direction} align="start" gap="4" className={classNames(cl.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Button
          isHovered
          key={tab.value}
          variant={tab.value === value ? 'active' : 'clear'}
          onClick={clickHandle(tab)}
        >
          {tab.content}
        </Button>
      ))}
    </Flex>
  );
});
