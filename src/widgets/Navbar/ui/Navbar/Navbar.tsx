import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { ToggleFeatures } from '@/shared/lib/features';
import { NavbarAuthDataRedesigned, NavbarRedesigned } from './NavbarRedesigned/NavbarRedesigned';
import { NavbarAuthDataDeprecated, NavbarDeprecated } from './NavbarDeprecated/NavbarDeprecated';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);

  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  if (authData) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<NavbarAuthDataRedesigned />}
        off={<NavbarAuthDataDeprecated />}
      />
    );
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <NavbarRedesigned
          isAuthModal={isAuthModal}
          onShowModal={onShowModal}
          onCloseModal={onCloseModal}
        />
      )}
      off={(
        <NavbarDeprecated
          isAuthModal={isAuthModal}
          onShowModal={onShowModal}
          onCloseModal={onCloseModal}
        />
      )}
    />
  );
});
