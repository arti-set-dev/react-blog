import { render, screen, fireEvent } from '@testing-library/react';
import { StarRating } from './StarRating';
import cl from './StarRating.module.scss';

interface TestSvgProps extends React.SVGProps<SVGSVGElement> {
  'data-testid'?: string;
  'data-selected'?: boolean | string;
}

jest.mock('@/shared/assets/icons/star-icon.svg', () => ({
  __esModule: true,
  default: (props: TestSvgProps) => (
    <svg
      {...props}
      data-testid={props['data-testid']}
      data-selected={props['data-selected']}
    >
      <path d="M1 1 L20 20" />
    </svg>
  ),
}));

describe('StarRating', () => {
  test('Рендер компонента StarRating', () => {
    render(<StarRating />);

    for (let i = 1; i <= 5; i += 1) {
      const star = screen.getByTestId(`StarRating.${i}`);
      expect(star).toBeInTheDocument();
    }
  });

  test('Применение дополнительного класса', () => {
    render(<StarRating className="custom-class" />);
    const container = screen.getByTestId('StarRating');
    expect(container).toHaveClass('custom-class');
  });

  test('Выбор звезд', () => {
    const onSelect = jest.fn();
    render(<StarRating onSelect={onSelect} />);

    const thirdStar = screen.getByTestId('StarRating.3');
    fireEvent.click(thirdStar);

    expect(onSelect).toHaveBeenCalledWith(3);
  });

  test('Подсветка звезд при наведении', () => {
    render(<StarRating />);

    const thirdStar = screen.getByTestId('StarRating.3');
    fireEvent.mouseEnter(thirdStar);

    for (let i = 1; i <= 3; i += 1) {
      const star = screen.getByTestId(`StarRating.${i}`);
      expect(star).toHaveClass(cl.hovered);
    }

    for (let i = 4; i <= 5; i += 1) {
      const star = screen.getByTestId(`StarRating.${i}`);
      expect(star).toHaveClass(cl.default);
    }
  });

  test('Сброс подсветки при уходе мыши', () => {
    render(<StarRating />);

    const thirdStar = screen.getByTestId('StarRating.3');
    fireEvent.mouseEnter(thirdStar);
    fireEvent.mouseLeave(thirdStar);

    for (let i = 1; i <= 5; i += 1) {
      const star = screen.getByTestId(`StarRating.${i}`);
      expect(star).toHaveClass(cl.default);
    }
  });

  test('Режим disabled', () => {
    render(<StarRating disabled />);
    const container = screen.getByTestId('StarRating');
    expect(container).toHaveClass(cl.disabled);
  });

  test('Начальное количество выбранных звезд', () => {
    render(<StarRating selectStars={3} />);

    for (let i = 1; i <= 3; i += 1) {
      const star = screen.getByTestId(`StarRating.${i}`);
      expect(star).toHaveAttribute('data-selected', 'true');
    }

    for (let i = 4; i <= 5; i += 1) {
      const star = screen.getByTestId(`StarRating.${i}`);
      expect(star).toHaveAttribute('data-selected', 'false');
    }
  });

  test('Изменение размера звезд', () => {
    const size = 40;
    render(<StarRating size={size} />);

    const star = screen.getByTestId('StarRating.1');
    expect(star).toHaveAttribute('width', size.toString());
    expect(star).toHaveAttribute('height', size.toString());
  });
});
