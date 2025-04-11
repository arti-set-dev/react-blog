import { screen, fireEvent } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Overlay } from './Overlay';

describe('Overlay', () => {
  test('Рендер компонента Overlay', () => {
    componentRender(<Overlay data-testid="overlay" />);
    expect(screen.getByTestId('overlay')).toBeInTheDocument();
  });

  test('Вызов onClick при клике на Overlay', () => {
    const onClick = jest.fn();
    componentRender(<Overlay data-testid="overlay" onClick={onClick} />);

    const overlay = screen.getByTestId('overlay');
    fireEvent.click(overlay);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('Overlay имеет класс opened при isOpen=true', () => {
    componentRender(<Overlay data-testid="overlay" isOpen />);

    const overlay = screen.getByTestId('overlay');
    expect(overlay).toHaveClass('opened');
  });

  test('Overlay не имеет класс opened при isOpen=false', () => {
    componentRender(<Overlay data-testid="overlay" isOpen={false} />);

    const overlay = screen.getByTestId('overlay');
    expect(overlay).not.toHaveClass('opened');
  });

  test('Overlay имеет класс OverflowOff при overflowOff=true', () => {
    componentRender(<Overlay data-testid="overlay" overflowOff />);

    const overlay = screen.getByTestId('overlay');
    expect(overlay).toHaveClass('OverflowOff');
  });

  test('Overlay не имеет класс OverflowOff при overflowOff=false', () => {
    componentRender(<Overlay data-testid="overlay" overflowOff={false} />);

    const overlay = screen.getByTestId('overlay');
    expect(overlay).not.toHaveClass('OverflowOff');
  });

  test('Overlay отображает дочерние элементы', () => {
    componentRender(
      <Overlay data-testid="overlay">
        <div data-testid="child">Дочерний элемент</div>
      </Overlay>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Дочерний элемент')).toBeInTheDocument();
  });

  test('Overlay принимает дополнительный className', () => {
    componentRender(<Overlay data-testid="overlay" className="custom-class" />);

    const overlay = screen.getByTestId('overlay');
    expect(overlay).toHaveClass('custom-class');
  });
});
