import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

const TestSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    data-testid="test-svg"
    {...props}
  >
    <path d="M1 1 L20 20" />
  </svg>
);

describe('Icon', () => {
  test('Рендер компонента Icon', () => {
    render(<Icon Svg={TestSvg} />);
    expect(screen.getByTestId('test-svg')).toBeInTheDocument();
  });

  test('Рендер с дополнительным классом', () => {
    const testClass = 'test-class';
    render(<Icon Svg={TestSvg} className={testClass} />);

    const svgElement = screen.getByTestId('test-svg');
    expect(svgElement).toHaveClass(testClass);
  });

  test('Передача дополнительных SVG атрибутов', () => {
    render(<Icon Svg={TestSvg} width={30} height={30} data-testattr="test-attr" />);

    const svgElement = screen.getByTestId('test-svg');
    expect(svgElement).toHaveAttribute('width', '30');
    expect(svgElement).toHaveAttribute('height', '30');
    expect(svgElement).toHaveAttribute('data-testattr', 'test-attr');
  });
});
