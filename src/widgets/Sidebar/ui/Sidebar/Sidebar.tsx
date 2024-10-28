import { FC, useState } from 'react';
import cl from './Sidebar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import ArrIcon from 'shared/assets/icons/arrow-icon.svg';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';

interface SidebarProps {
    className?: string;
}

export const Sidebar: FC<SidebarProps> = (props) => {
    const { children, className } = props;
    const [collapsed, setCollapsed] = useState(false);

    const toggleSildebar = () => {
        setCollapsed(prev => !prev);
    }

    return (
        <aside className={classNames(cl.Sidebar, {[cl.collapsed]: collapsed}, [className])}>
            <div className={cl.Switchers}>
                <ThemeSwitcher/>
                <LangSwitcher className={cl.LangSwitcher} />
            </div>
            <Button theme={ButtonTheme.ICON} className={classNames(cl.Collapse, {}, [className])} onClick={toggleSildebar} aria-label='toggle sidebar'>
                <ArrIcon/>
            </Button>
        </aside>
    );
};