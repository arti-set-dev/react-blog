import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Skeleton } from './Skeleton';
import cl from './Skeleton.module.scss';

describe('Skeleton', () => {
  test('Рендер с дефолтными значениями', () => {
    componentRender(<Skeleton />);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass(cl.Skeleton, cl.radius_20);
  });

  test('Рендер с заданными размерами', () => {
    componentRender(
      <Skeleton
        width={100}
        height={200}
      />,
    );

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle({
      maxWidth: '100px',
      height: '200px',
    });
  });

  test('Рендер с процентными размерами', () => {
    componentRender(
      <Skeleton
        width="50%"
        height="75%"
      />,
    );

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle({
      maxWidth: '50%',
      height: '75%',
    });
  });

  test('Рендер с разными border-radius', () => {
    const { rerender } = componentRender(
      <Skeleton border="4" />,
    );

    let skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass(cl.radius_4);

    rerender(<Skeleton border="8" />);
    skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass(cl.radius_8);

    rerender(<Skeleton border="circle" />);
    skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass(cl.circle);
  });

  test('Рендер с дополнительным классом', () => {
    componentRender(
      <Skeleton className="custom-class" />,
    );

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('custom-class');
  });
});
