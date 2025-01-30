import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import ArrIcon from '@/shared/assets/icons/arrow-icon.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { getSidebarItems } from '../../model/selector/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { SidebarRedesigned } from '../SidebarRedesigned/SidebarRedesigned';
import cl from './Sidebar.module.scss';

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

  const itemsList = useMemo(
    () => sidebarItemsList.map((item) => (
      <li key={item.text}>
        <SidebarItem item={item} collapsed={collapsed} />
      </li>
    )),
    [collapsed, sidebarItemsList],
  );

  const sidebarDeprecated = (
    <aside
      data-testid="sidebar"
      className={classNames(cl.Sidebar, { [cl.collapsed]: collapsed }, [
        className,
      ])}
    >
      <Button
        data-testid="sidebar-toggle"
        size={ButtonSize.L}
        theme={ButtonTheme.ICON}
        className={classNames(cl.CollapseBtn, {}, [className])}
        onClick={toggleSidebar}
        aria-label={t('toggle sidebar')}
      >
        <Icon Svg={ArrIcon} width="100%" height="100%" />
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

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<SidebarRedesigned />}
      off={sidebarDeprecated}
    />
  );
});
