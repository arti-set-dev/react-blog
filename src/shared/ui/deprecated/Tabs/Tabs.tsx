import { memo, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './Tabs.module.scss';
import { Button, ButtonTheme } from '../Button/Button';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick?: (tab: TabItem) => void;
  fullWidth?: boolean;
}

/**
 * Outdated, use the component from the Redesigned folder
 * @deprecated
 */
export const Tabs = memo((props: TabsProps) => {
  const {
    className, tabs, value, onTabClick, fullWidth,
  } = props;
  const { t } = useTranslation();

  const clickHandle = useCallback(
    (tab: TabItem) => () => {
      onTabClick?.(tab);
    },
    [onTabClick],
  );

  return (
    <div className={classNames(cl.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Button
          fullWidth={fullWidth}
          key={tab.value}
          theme={tab.value === value ? ButtonTheme.ACTIVE : ButtonTheme.OUTLINE}
          onClick={clickHandle(tab)}
        >
          {tab.content}
        </Button>
      ))}
    </div>
  );
});
