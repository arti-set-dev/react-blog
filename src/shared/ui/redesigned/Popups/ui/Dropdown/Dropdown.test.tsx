import { screen, fireEvent } from '@testing-library/react';
import { Dropdown } from './Dropdown';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

const mockItems = [
  { content: 'Пункт 1' },
  { content: 'Пункт 2', href: '/test' },
  { content: 'Пункт 3', disabled: true },
];

describe('Dropdown', () => {
  test('Рендер компонента', () => {
    componentRender(
      <Dropdown
        trigger={<button type="button">Открыть меню</button>}
        items={mockItems}
        data-testid="dropdown"
      />,
    );

    expect(screen.getByText('Открыть меню')).toBeInTheDocument();
  });

  test('Рендер с дополнительным классом', () => {
    componentRender(
      <Dropdown
        trigger={<button type="button">Открыть меню</button>}
        items={mockItems}
        className="test-class"
        data-testid="dropdown"
      />,
    );

    const dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toHaveClass('test-class');
  });

  test('Рендер с кастомным направлением', () => {
    componentRender(
      <Dropdown
        trigger={<button type="button">Открыть меню</button>}
        items={mockItems}
        direction="top right"
        data-testid="dropdown"
      />,
    );

    const triggerButton = screen.getByText('Открыть меню');
    fireEvent.click(triggerButton);

    const menuItems = screen.getByTestId('dropdown.Items');
    expect(menuItems).toHaveClass('dropdownTopRight');
  });

  test('Открытие/закрытие меню', () => {
    componentRender(
      <Dropdown
        trigger={<button type="button">Открыть меню</button>}
        items={mockItems}
        data-testid="dropdown"
      />,
    );

    const triggerButton = screen.getByText('Открыть меню');
    fireEvent.click(triggerButton);

    expect(screen.getByText('Пункт 1')).toBeInTheDocument();
    expect(screen.getByText('Пункт 2')).toBeInTheDocument();
    expect(screen.getByText('Пункт 3')).toBeInTheDocument();

    fireEvent.click(triggerButton);
    expect(screen.queryByText('Пункт 1')).not.toBeInTheDocument();
  });
});
