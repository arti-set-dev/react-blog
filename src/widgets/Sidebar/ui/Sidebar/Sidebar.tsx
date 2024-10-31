import { FC, useState } from 'react';
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
import cl from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar: FC<SidebarProps> = (props) => {
  const { children, className } = props;
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  const toggleSildebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <aside data-testid="sidebar" className={classNames(cl.Sidebar, { [cl.collapsed]: collapsed }, [className])}>
      <nav className={cl.SidebarNav}>
        <List className={cl.Menulist}>
          <li>
            <AppLink to={RoutePath.main} className={cl.SidebarLink}>
              <HomeIcon />
              {t('Main')}
            </AppLink>
          </li>
          <li>
            <AppLink className={cl.SidebarLink} to={RoutePath.about}>
              <AboutIcon />
              {t('About')}
            </AppLink>
          </li>
        </List>
      </nav>
      <div className={cl.Switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} />
      </div>
      <Button
        data-testid="sidebar-toggle"
        size={ButtonSize.XL}
        theme={ButtonTheme.ICON}
        className={classNames(cl.CollapseBtn, {}, [className])}
        onClick={toggleSildebar}
        aria-label={t('toggle sidebar')}
      >
        <ArrIcon />
      </Button>
    </aside>
  );
};
