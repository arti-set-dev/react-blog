import { memo, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getSidebarItems } from '../../model/selector/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import ArrIcon from '@/shared/assets/icons/arrow-icon.svg';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import cl from './SidebarRedesigned.module.scss';

interface SidebarRedesignedProps {
  className?: string;
}

export const SidebarRedesigned = memo((props: SidebarRedesignedProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItemsList = useSelector(getSidebarItems);
  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };
  const itemsList = useMemo(
    () => sidebarItemsList.map((item) => (
      <li key={item.text} className={cl.SidebarListItem}>
        <SidebarItem item={item} collapsed={collapsed} />
      </li>
    )),
    [collapsed, sidebarItemsList],
  );

  return (
    <aside
      data-testid="sidebar"
      className={classNames(cl.SidebarRedesigned, { [cl.collapsed]: collapsed }, [
        className,
      ])}
    >
      {/* <Avatar alt='' src={} /> */}
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
        <VStack tag="ul" gap="4">
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
