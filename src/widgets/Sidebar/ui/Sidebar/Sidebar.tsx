import {
  FC, memo, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RoutePath } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import ArrIcon from '@/shared/assets/icons/arrow-icon.svg';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';
import { AppLink } from '@/shared/ui/AppLink';
import { List } from '@/shared/ui/List';
import HomeIcon from '@/shared/assets/icons/home-icon.svg';
import AboutIcon from '@/shared/assets/icons/about-icon.svg';
import { VStack } from '@/shared/ui/Stack';
import { getSidebarItems } from '../../model/selector/getSidebarItems';
import cl from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
  const { className } = props;
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();
  const sidebarItemsList = useSelector(getSidebarItems);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(() => sidebarItemsList.map((item) => (
    <li key={item.text}>
      <SidebarItem item={item} collapsed={collapsed} />
    </li>
  )), [collapsed, sidebarItemsList]);

  return (
    <aside data-testid="sidebar" className={classNames(cl.Sidebar, { [cl.collapsed]: collapsed }, [className])}>
      <Button
        data-testid="sidebar-toggle"
        size={ButtonSize.L}
        theme={ButtonTheme.ICON}
        className={classNames(cl.CollapseBtn, {}, [className])}
        onClick={toggleSidebar}
        aria-label={t('toggle sidebar')}
      >
        <ArrIcon />
      </Button>
      <nav>
        <VStack tag="ul" gap="16">
          {itemsList}
        </VStack>
      </nav>
      <div className={cl.Switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} />
      </div>
    </aside>
  );
});
