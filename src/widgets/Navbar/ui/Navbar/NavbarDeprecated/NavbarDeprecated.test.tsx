import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { NavbarDeprecated } from './NavbarDeprecated';
import { User } from '@/entities/User';

const mockUser: User = {
  id: '1',
  username: 'test',
  avatar: 'test-avatar',
  email: 'test@test.com',
};

describe('NavbarDeprecated', () => {
  test('Рендер без авторизации', () => {
    componentRender(
      <NavbarDeprecated
        onCloseModal={jest.fn()}
        onShowModal={jest.fn()}
        isAuthModal={false}
      />,
    );

    expect(screen.getByTestId('Navbar')).toBeInTheDocument();
    expect(screen.getByTestId('Navbar.Logo')).toBeInTheDocument();
    expect(screen.getByTestId('Navbar.LoginButton')).toBeInTheDocument();
    expect(screen.queryByTestId('Navbar.AvatarDropdown')).not.toBeInTheDocument();
    expect(screen.queryByTestId('AuthModal')).not.toBeInTheDocument();
  });

  test('Рендер с авторизацией', () => {
    componentRender(
      <NavbarDeprecated
        authData={mockUser}
        onCloseModal={jest.fn()}
        onShowModal={jest.fn()}
        isAuthModal={false}
      />,
    );

    expect(screen.getByTestId('Navbar')).toBeInTheDocument();
    expect(screen.getByTestId('Navbar.Logo')).toBeInTheDocument();
    expect(screen.getByTestId('Navbar.AvatarDropdown')).toBeInTheDocument();
    expect(screen.queryByTestId('Navbar.LoginButton')).not.toBeInTheDocument();
    expect(screen.queryByTestId('AuthModal')).not.toBeInTheDocument();
  });

  test('Клик по кнопке логина вызывает onShowModal', () => {
    const onShowModal = jest.fn();
    componentRender(
      <NavbarDeprecated
        onCloseModal={jest.fn()}
        onShowModal={onShowModal}
        isAuthModal={false}
      />,
    );

    screen.getByTestId('Navbar.LoginButton').click();
    expect(onShowModal).toHaveBeenCalled();
  });

  test('Рендер модального окна авторизации', () => {
    componentRender(
      <NavbarDeprecated
        onCloseModal={jest.fn()}
        onShowModal={jest.fn()}
        isAuthModal
      />,
    );

    expect(screen.getByTestId('AuthModal')).toBeInTheDocument();
  });
});
