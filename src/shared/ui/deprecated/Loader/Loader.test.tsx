import { render } from '@testing-library/react';
import { Loader, LoaderTheme, LoaderOffset } from './Loader';

describe('Loader', () => {
  test('Рендер компонента Loader', () => {
    const { container } = render(<Loader />);
    const loaderElement = container.querySelector('.Loader');
    expect(loaderElement).toBeInTheDocument();
  });

  test('Применение темы INVERTED (по умолчанию)', () => {
    const { container } = render(<Loader />);
    const loaderElement = container.querySelector('.Loader');
    expect(loaderElement).toHaveClass('inverted');
  });

  test('Применение темы PRIMARY', () => {
    const { container } = render(<Loader theme={LoaderTheme.PRIMARY} />);
    const loaderElement = container.querySelector('.Loader');
    expect(loaderElement).toHaveClass('primary');
  });

  test('Применение отступа DEFAULT (по умолчанию)', () => {
    const { container } = render(<Loader />);
    const loaderElement = container.querySelector('.Loader');
    expect(loaderElement).toHaveClass('offset-default');
  });

  test('Применение отступа L', () => {
    const { container } = render(<Loader offset={LoaderOffset.L} />);
    const loaderElement = container.querySelector('.Loader');
    expect(loaderElement).toHaveClass('offset-l');
  });

  test('Применение отступа XL', () => {
    const { container } = render(<Loader offset={LoaderOffset.XL} />);
    const loaderElement = container.querySelector('.Loader');
    expect(loaderElement).toHaveClass('offset-xl');
  });

  test('Применение отступа AUTO', () => {
    const { container } = render(<Loader offset={LoaderOffset.AUTO} />);
    const loaderElement = container.querySelector('.Loader');
    expect(loaderElement).toHaveClass('auto');
  });

  test('Применение дополнительного класса', () => {
    const { container } = render(<Loader className="custom-class" />);
    const loaderElement = container.querySelector('.Loader');
    expect(loaderElement).toHaveClass('custom-class');
  });
});
