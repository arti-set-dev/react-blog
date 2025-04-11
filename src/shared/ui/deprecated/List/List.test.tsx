import { render, screen } from '@testing-library/react';
import { List } from './List';

describe('List', () => {
  test('Рендер пустого компонента List', () => {
    render(<List />);
    const listElement = screen.getByRole('list');
    expect(listElement).toBeInTheDocument();
  });

  test('Рендер с дочерними элементами', () => {
    render(
      <List>
        <li data-testid="item-1">Элемент 1</li>
        <li data-testid="item-2">Элемент 2</li>
        <li data-testid="item-3">Элемент 3</li>
      </List>,
    );

    const listElement = screen.getByRole('list');
    expect(listElement).toBeInTheDocument();

    expect(screen.getByTestId('item-1')).toBeInTheDocument();
    expect(screen.getByTestId('item-2')).toBeInTheDocument();
    expect(screen.getByTestId('item-3')).toBeInTheDocument();

    expect(screen.getByText('Элемент 1')).toBeInTheDocument();
    expect(screen.getByText('Элемент 2')).toBeInTheDocument();
    expect(screen.getByText('Элемент 3')).toBeInTheDocument();
  });

  test('Применение дополнительного класса', () => {
    render(<List className="custom-class" />);

    const listElement = screen.getByRole('list');
    expect(listElement).toHaveClass('custom-class');
  });

  test('Передача дополнительных атрибутов', () => {
    render(<List data-testid="custom-list" aria-label="Тестовый список" />);

    const listElement = screen.getByTestId('custom-list');
    expect(listElement).toHaveAttribute('aria-label', 'Тестовый список');
  });
});
