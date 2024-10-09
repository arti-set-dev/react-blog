import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Container } from 'shared/ui/Container/Container';
import { List } from 'shared/ui/List/List';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
    const { t } = useTranslation();

    return (
        <header className={classNames(cls.Navbar)}>
            <Container className={classNames(cls.container)}>
                <nav className={classNames(cls.Nav)}>
                    <List className={cls.NavList}>
                        <li>
                            <AppLink to="/">{t('home')}</AppLink>
                        </li>
                        <li>
                            <AppLink to="/about">{t('about')}</AppLink>
                        </li>
                    </List>
                </nav>
            </Container>
        </header>
    );
};
