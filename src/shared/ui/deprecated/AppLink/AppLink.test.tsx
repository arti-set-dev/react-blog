import { screen } from '@testing-library/react';
import { AppLink, AppLinkTheme } from './AppLink';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

describe('AppLink', () => {
  test('Рендер с текстом', () => {
    componentRender(<AppLink to="/">Тестовая ссылка</AppLink>);
    expect(screen.getByText('Тестовая ссылка')).toBeInTheDocument();
  });

  test('Рендер с темой PRIMARY по умолчанию', () => {
    componentRender(<AppLink to="/">Тестовая ссылка</AppLink>);
    expect(screen.getByText('Тестовая ссылка')).toHaveClass('primary');
  });

  test('Рендер с темой SECONDARY', () => {
    componentRender(
      <AppLink to="/" theme={AppLinkTheme.SECONDARY}>
        Тестовая ссылка
      </AppLink>,
    );
    expect(screen.getByText('Тестовая ссылка')).toHaveClass('secondary');
  });

  test('Рендер с темой INVERTED', () => {
    componentRender(
      <AppLink to="/" theme={AppLinkTheme.INVERTED}>
        Тестовая ссылка
      </AppLink>,
    );
    expect(screen.getByText('Тестовая ссылка')).toHaveClass('inverted');
  });

  test('Рендер с темой RED', () => {
    componentRender(
      <AppLink to="/" theme={AppLinkTheme.RED}>
        Тестовая ссылка
      </AppLink>,
    );
    expect(screen.getByText('Тестовая ссылка')).toHaveClass('red');
  });

  test('Рендер с дополнительным классом', () => {
    componentRender(
      <AppLink to="/" className="customClass">
        Тестовая ссылка
      </AppLink>,
    );
    expect(screen.getByText('Тестовая ссылка')).toHaveClass('customClass');
  });

  test('Проверка правильности пути в ссылке', () => {
    componentRender(<AppLink to="/test-path">Тестовая ссылка</AppLink>);
    const linkElement = screen.getByText('Тестовая ссылка');
    expect(linkElement.getAttribute('href')).toBe('/test-path');
  });

  test('Проверка передачи дополнительных props', () => {
    componentRender(
      <AppLink to="/" data-testid="test-link" target="_blank">
        Тестовая ссылка
      </AppLink>,
    );
    const linkElement = screen.getByTestId('test-link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('target', '_blank');
  });
});
