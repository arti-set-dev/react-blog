import { FC, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import ArrIcon from 'shared/assets/icons/arrow-icon.svg';
import { ThemeSwither } from 'widgets/ThemeSwither';
import { LanguageSwither } from 'widgets/LanguageSwither';
import { useTranslation } from 'react-i18next';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ className, children }) => {
    const { t } = useTranslation();
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <aside className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
            {children}
            <div className={cls.swithers}>
                <LanguageSwither />
                <ThemeSwither />
            </div>
            <Button
                className={classNames(cls.SidebarBtn, { [cls.collapsed]: collapsed })}
                theme={ThemeButton.SIDE}
                onClick={toggleSidebar}
                aria-label={t('toggle Sidebar')}
            >
                <ArrIcon />
            </Button>
        </aside>
    );
};
