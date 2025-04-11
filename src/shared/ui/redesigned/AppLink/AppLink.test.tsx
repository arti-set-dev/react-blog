import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppLink } from './AppLink';
import cl from './AppLink.module.scss';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

const TEST_ICON = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    data-testid="test-icon"
  >
    <path d="M1 1 L20 20" />
  </svg>
);

describe('AppLink', () => {
  const renderWithRouter = (component: React.ReactNode) => render(
    <MemoryRouter>
      {component}
    </MemoryRouter>,
  );

  test('Рендер компонента AppLink', () => {
    renderWithRouter(<AppLink to="/test">Test Link</AppLink>);
    const link = screen.getByText('Test Link');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/test');
  });

  test('Применение дополнительного класса', () => {
    renderWithRouter(<AppLink to="/test" className="custom-class">Test Link</AppLink>);
    const link = screen.getByText('Test Link').closest('a');
    expect(link).toHaveClass('custom-class');
  });

  describe('Варианты стилей', () => {
    const variants = ['inverted', 'primary', 'primary-light', 'secondary', 'red'] as const;
    test.each(variants)('вариант %s', (variant) => {
      renderWithRouter(<AppLink to="/test" variant={variant}>Test Link</AppLink>);
      const link = screen.getByText('Test Link').closest('a');
      expect(link).toHaveClass(cl[variant]);
    });
  });

  test('Активный класс', () => {
    renderWithRouter(
      <AppLink to="/" activeClassName="active-test">
        Test Link
      </AppLink>,
    );
    const link = screen.getByText('Test Link').closest('a');
    expect(link).toHaveClass(cl.AppLink);
    expect(link).toHaveClass('active-test');
  });

  test('Состояние наведения', () => {
    renderWithRouter(
      <AppLink to="/test" isHovered>
        Test Link
      </AppLink>,
    );
    const link = screen.getByText('Test Link').closest('a');
    expect(link).toHaveClass(cl.hovered);
  });

  test('Рендер с иконкой', () => {
    renderWithRouter(
      <AppLink to="/test" Svg={TEST_ICON}>
        Test Link
      </AppLink>,
    );
    const icon = screen.getByTestId('test-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('width', '25');
    expect(icon).toHaveAttribute('height', '25');
  });

  test('Значения по умолчанию', () => {
    renderWithRouter(<AppLink to="/test">Test Link</AppLink>);
    const link = screen.getByText('Test Link').closest('a');
    expect(link).toHaveClass(cl.AppLink);
    expect(link).toHaveClass(cl.primary); // primary - вариант по умолчанию
    expect(link).not.toHaveClass(cl.hovered);
  });

  test('Передача дополнительных пропсов', () => {
    renderWithRouter(
      <AppLink to="/test" data-testid="test-link" title="Test Title">
        Test Link
      </AppLink>,
    );
    const link = screen.getByTestId('test-link');
    expect(link).toHaveAttribute('title', 'Test Title');
  });
});
