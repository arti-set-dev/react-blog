import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';
import cl from './Button.module.scss';

jest.mock('../Icon/Icon', () => ({
  Icon: ({ Svg }: { Svg: React.FC }) => (
    <div data-testid="button-icon">
      <Svg />
    </div>
  ),
}));

describe('Button', () => {
  afterEach(cleanup);

  test('Рендер с дефолтными значениями', () => {
    render(<Button>Test</Button>);

    const button = screen.getByText('Test');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(cl.Button, cl.primary, cl.l);
    expect(button).not.toBeDisabled();
  });

  test('Рендер с разными вариантами', () => {
    const variants = [
      'icon',
      'outline-inverted',
      'outline',
      'outline-red',
      'text-inverted',
      'primary',
      'text-primary',
      'active',
      'clear',
      'text-light',
    ] as const;

    variants.forEach((variant) => {
      cleanup();
      render(<Button variant={variant} data-testid={`button-${variant}`}>Test</Button>);
      const button = screen.getByTestId(`button-${variant}`);
      expect(button).toHaveClass(cl[variant]);
    });
  });

  test('Рендер с разными размерами', () => {
    const sizes = ['xs', 'l', 'xl'] as const;

    sizes.forEach((size) => {
      cleanup();
      render(<Button size={size} data-testid={`button-${size}`}>Test</Button>);
      const button = screen.getByTestId(`button-${size}`);
      expect(button).toHaveClass(cl[size]);
    });
  });

  test('Рендер в состоянии disabled', () => {
    render(<Button disabled>Test</Button>);

    const button = screen.getByText('Test');
    expect(button).toBeDisabled();
    expect(button).toHaveClass(cl.disabled);
  });

  test('Рендер с полной шириной', () => {
    render(<Button fullWidth>Test</Button>);

    const button = screen.getByText('Test');
    expect(button).toHaveClass(cl.fullWidth);
  });

  test('Рендер с разными позициями', () => {
    const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const;

    positions.forEach((position) => {
      cleanup();
      render(<Button position={position} data-testid={`button-${position}`}>Test</Button>);
      const button = screen.getByTestId(`button-${position}`);
      expect(button).toHaveClass(cl.isAbsolute, cl[position]);
    });
  });

  test('Рендер с анимацией', () => {
    render(<Button animation="shake">Test</Button>);

    const button = screen.getByText('Test');
    expect(button).toHaveClass(cl.shake);
  });

  test('Рендер в состоянии наведения', () => {
    render(<Button isHovered>Test</Button>);

    const button = screen.getByText('Test');
    expect(button).toHaveClass(cl.isHovered);
  });

  test('Рендер в активном состоянии', () => {
    render(<Button isActive>Test</Button>);

    const button = screen.getByText('Test');
    expect(button).toHaveClass(cl.isActive);
  });

  test('Рендер с SVG иконкой', () => {
    const TestIcon = () => <svg data-testid="test-svg" />;
    render(<Button Svg={TestIcon}>Test</Button>);

    const icon = screen.getByTestId('button-icon');
    const svg = screen.getByTestId('test-svg');
    expect(icon).toBeInTheDocument();
    expect(svg).toBeInTheDocument();
  });

  test('Обработка клика', async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Test</Button>);

    const button = screen.getByText('Test');
    await userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('Клик не срабатывает в состоянии disabled', async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} disabled>Test</Button>);

    const button = screen.getByText('Test');
    await userEvent.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  test('Применение дополнительного класса', () => {
    render(<Button className="custom-class">Test</Button>);

    const button = screen.getByText('Test');
    expect(button).toHaveClass('custom-class');
  });

  test('Рендер с разными типами кнопок', () => {
    const types = ['button', 'submit', 'reset'] as const;

    types.forEach((type) => {
      cleanup();
      render(<Button type={type} data-testid={`button-${type}`}>Test</Button>);
      const button = screen.getByTestId(`button-${type}`);
      expect(button).toHaveAttribute('type', type);
    });
  });
});
