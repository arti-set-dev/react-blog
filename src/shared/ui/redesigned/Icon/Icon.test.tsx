import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';
import cl from './Icon.module.scss';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
  }),
}));

const MockSvg = ({
  width, height, className, ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    data-testid="mock-svg"
    width={width}
    height={height}
    className={className}
    {...props}
  />
);

describe('Icon', () => {
  test('Рендер с дефолтными значениями', () => {
    render(<Icon Svg={MockSvg} />);

    const icon = screen.getByTestId('mock-svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('width', '25');
    expect(icon).toHaveAttribute('height', '25');
  });

  test('Рендер с дополнительным классом', () => {
    render(<Icon Svg={MockSvg} className="custom-class" />);

    const icon = screen.getByTestId('mock-svg');
    expect(icon).toHaveClass(cl.Icon);
  });

  test('Рендер с разными цветами', () => {
    const colors: Array<'primary' | 'error' | 'inverted' | 'normal'> = ['primary', 'error', 'inverted', 'normal'];

    colors.forEach((color) => {
      const { unmount } = render(<Icon Svg={MockSvg} color={color} />);
      const icon = screen.getByTestId('mock-svg');
      expect(icon).toHaveClass(cl[color]);
      unmount();
    });
  });

  test('Рендер с анимацией', () => {
    render(<Icon Svg={MockSvg} animation="show" />);

    const icon = screen.getByTestId('mock-svg');
    expect(icon).toHaveClass(cl.show);
  });

  test('Рендер с кастомными размерами', () => {
    render(<Icon Svg={MockSvg} width={50} height={50} />);

    const icon = screen.getByTestId('mock-svg');
    expect(icon).toHaveAttribute('width', '50');
    expect(icon).toHaveAttribute('height', '50');
  });
});
