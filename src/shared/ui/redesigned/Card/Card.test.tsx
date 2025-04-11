import { render, screen, cleanup } from '@testing-library/react';
import { Card } from './Card';
import cl from './Card.module.scss';

describe('Card', () => {
  afterEach(cleanup);

  test('Рендер с дефолтными значениями', () => {
    render(<Card>Test content</Card>);

    const card = screen.getByText('Test content');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass(cl.Card, cl.primary, cl.offset_8, cl.radius_20);
    expect(card.tagName.toLowerCase()).toBe('article');
  });

  test('Рендер с разными вариантами', () => {
    const variants = [
      'primary',
      'outline',
      'outline-inverted',
      'outline-inverted-bg',
      'inverted',
      'active',
      'transparent',
      'accent',
    ] as const;

    variants.forEach((variant) => {
      cleanup();
      render(<Card variant={variant} data-testid={`card-${variant}`}>Test content</Card>);
      const card = screen.getByTestId(`card-${variant}`);
      expect(card).toHaveClass(cl[variant]);
    });
  });

  test('Рендер с разными тегами', () => {
    const tags = [
      'article',
      'aside',
      'h3',
      'main',
      'div',
      'form',
      'li',
      'pre',
      'header',
      'footer',
      'section',
    ] as const;

    tags.forEach((tag) => {
      cleanup();
      render(<Card tag={tag} data-testid={`card-${tag}`}>Test content</Card>);
      const card = screen.getByTestId(`card-${tag}`);
      expect(card.tagName.toLowerCase()).toBe(tag);
    });
  });

  test('Рендер с разными позициями', () => {
    const positions = ['absolute', 'sticky', 'fixed'] as const;

    positions.forEach((position) => {
      cleanup();
      render(<Card position={position} data-testid={`card-${position}`}>Test content</Card>);
      const card = screen.getByTestId(`card-${position}`);
      expect(card).toHaveClass(cl[position]);
    });
  });

  test('Рендер с разными угловыми позициями', () => {
    const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'bottom'] as const;

    corners.forEach((corner) => {
      cleanup();
      render(<Card positionCorner={corner} data-testid={`card-${corner}`}>Test content</Card>);
      const card = screen.getByTestId(`card-${corner}`);
      expect(card).toHaveClass(cl[corner]);
    });
  });

  test('Рендер с разными отступами', () => {
    const offsets = ['0', '4', '8', '16', '24'] as const;

    offsets.forEach((offset) => {
      cleanup();
      render(<Card offset={offset} data-testid={`card-${offset}`}>Test content</Card>);
      const card = screen.getByTestId(`card-${offset}`);
      expect(card).toHaveClass(cl[`offset_${offset}`]);
    });
  });

  test('Рендер с разными радиусами скругления', () => {
    const borders = ['0', '4', '8', '10', '12', '20', 'circle'] as const;

    borders.forEach((border) => {
      cleanup();
      render(<Card border={border} data-testid={`card-${border}`}>Test content</Card>);
      const card = screen.getByTestId(`card-${border}`);
      expect(card).toHaveClass(cl[`radius_${border}`]);
    });
  });

  test('Рендер в состоянии наведения', () => {
    render(<Card isHovered>Test content</Card>);

    const card = screen.getByText('Test content');
    expect(card).toHaveClass(cl.hovered);
  });

  test('Рендер с отступом', () => {
    render(<Card isOffset>Test content</Card>);

    const card = screen.getByText('Test content');
    expect(card).toHaveClass(cl.offset);
  });

  test('Рендер с максимальной шириной', () => {
    render(<Card max>Test content</Card>);

    const card = screen.getByText('Test content');
    expect(card).toHaveClass(cl.max);
  });

  test('Рендер с переполнением', () => {
    render(<Card isOverflow>Test content</Card>);

    const card = screen.getByText('Test content');
    expect(card).toHaveClass(cl.overflow);
  });

  test('Рендер в скрытом состоянии', () => {
    render(<Card isHidden>Test content</Card>);

    const card = screen.getByText('Test content');
    expect(card).toHaveClass(cl.isHidden);
  });

  test('Рендер с заданными размерами', () => {
    render(
      <Card
        height={100}
        width={200}
        maxWidth={300}
        flexBasis="50%"
      >
        Test content
      </Card>,
    );

    const card = screen.getByText('Test content');
    expect(card).toHaveStyle({
      height: '100px',
      width: '200px',
      maxWidth: '300px',
      flexBasis: '50%',
    });
  });

  test('Рендер с анимацией', () => {
    render(<Card animation="show">Test content</Card>);

    const card = screen.getByText('Test content');
    expect(card).toHaveClass(cl.show);
  });

  test('Рендер с позиционным отступом', () => {
    render(<Card positionOffset="20px">Test content</Card>);

    const card = screen.getByText('Test content');
    expect(card).toHaveStyle({ bottom: '20px' });
  });

  test('Применение дополнительного класса', () => {
    render(<Card className="custom-class">Test content</Card>);

    const card = screen.getByText('Test content');
    expect(card).toHaveClass('custom-class');
  });
});
