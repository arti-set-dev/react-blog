import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { NavbarRedesigned } from './NavbarRedesigned';

describe('NavbarRedesigned', () => {
  test('Рендер без авторизации', () => {
    componentRender(
      <NavbarRedesigned
        onCloseModal={jest.fn()}
        onShowModal={jest.fn()}
        isAuthModal={false}
      />,
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('Клик по кнопке логина вызывает onShowModal', () => {
    const onShowModal = jest.fn();
    componentRender(
      <NavbarRedesigned
        onCloseModal={jest.fn()}
        onShowModal={onShowModal}
        isAuthModal={false}
      />,
    );

    screen.getByRole('button', { name: /login/i }).click();
    expect(onShowModal).toHaveBeenCalled();
  });

  test('Рендер модального окна авторизации', () => {
    componentRender(
      <NavbarRedesigned
        onCloseModal={jest.fn()}
        onShowModal={jest.fn()}
        isAuthModal
      />,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
