import { FC, memo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import ArrIcon from 'shared/assets/icons/arrow-icon.svg';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { useTranslation } from 'react-i18next';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { List } from 'shared/ui/List/List';
import HomeIcon from 'shared/assets/icons/home-icon.svg';
import AboutIcon from 'shared/assets/icons/about-icon.svg';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { SidebarItemsList } from 'widgets/Sidebar/model/items';
import cl from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
  const { className } = props;
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

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
        <List className={cl.Menulist}>
          {SidebarItemsList.map((item) => (
            <li key={item.path}>
              <SidebarItem item={item} collapsed={collapsed} />
            </li>
          ))}
        </List>
      </nav>
      <div className={cl.Switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} />
      </div>
    </aside>
  );
});
