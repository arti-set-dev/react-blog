import { FC, useEffect, useRef } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Link } from 'react-router-dom';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Container } from 'shared/ui/Container/Container';
import { List } from 'shared/ui/List/List';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { useTranslation } from 'react-i18next';
import cl from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar: FC<NavbarProps> = (props) => {
  const { children, className } = props;
  const { t } = useTranslation();

  return (
    <header className={classNames(cl.Navbar, {}, [className])}>
      <Container className={cl.Container} />
    </header>
  );
};
