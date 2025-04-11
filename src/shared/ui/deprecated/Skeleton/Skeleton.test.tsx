import { render, screen } from '@testing-library/react';
import { Skeleton, SkeletonAlign } from './Skeleton';
import cl from './Skeleton.module.scss';

describe('Skeleton', () => {
  test('Рендер компонента Skeleton', () => {
    render(<Skeleton />);
    const skeleton = screen.getByTestId('Skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass(cl.Skeleton);
  });

  test('Применение дополнительного класса', () => {
    render(<Skeleton className="custom-class" />);
    const skeleton = screen.getByTestId('Skeleton');
    expect(skeleton).toHaveClass('custom-class');
  });

  test('Применение стилей', () => {
    const height = '100px';
    const width = '200px';
    const border = '10px';

    render(
      <Skeleton
        height={height}
        width={width}
        border={border}
      />,
    );

    const skeleton = screen.getByTestId('Skeleton');
    expect(skeleton).toHaveStyle({
      height,
      maxWidth: width,
      borderRadius: border,
    });
  });

  test('Применение выравнивания по умолчанию', () => {
    render(<Skeleton />);
    const skeleton = screen.getByTestId('Skeleton');
    expect(skeleton).toHaveClass(cl[SkeletonAlign.CENTER]);
  });

  test('Применение разных типов выравнивания', () => {
    const alignments = [
      SkeletonAlign.LEFT,
      SkeletonAlign.RIGHT,
      SkeletonAlign.CENTER,
      SkeletonAlign.DEFAULT,
    ];

    alignments.forEach((align) => {
      const { unmount } = render(<Skeleton align={align} />);
      const skeleton = screen.getByTestId('Skeleton');
      expect(skeleton).toHaveClass(cl[align]);
      unmount();
    });
  });

  test('Применение числовых значений для размеров', () => {
    const height = 100;
    const width = 200;

    render(
      <Skeleton
        height={height}
        width={width}
      />,
    );

    const skeleton = screen.getByTestId('Skeleton');
    expect(skeleton).toHaveStyle({
      height: `${height}px`,
      maxWidth: `${width}px`,
    });
  });
});
