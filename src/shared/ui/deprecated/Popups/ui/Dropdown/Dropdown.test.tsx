import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Dropdown, DropdownItem } from './Dropdown';
import { DropdownDirection } from '@/shared/const/ui';
import { mapDirectionClass } from '../../styles/consts';

// Мок для i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

describe('Dropdown', () => {
  const items: DropdownItem[] = [
    {
      content: 'Пункт 1',
      onclick: jest.fn(),
    },
    {
      content: 'Пункт 2',
      onclick: jest.fn(),
      disabled: true,
    },
    {
      content: 'Ссылка',
      href: '/test-link',
    },
  ];

  const trigger = <button>Открыть</button>;

  const renderWithRouter = (component: React.ReactNode) => render(
    <MemoryRouter>{component}</MemoryRouter>,
  );

  test('Рендер компонента Dropdown', () => {
    renderWithRouter(<Dropdown items={items} trigger={trigger} />);
    expect(screen.getByText('Открыть')).toBeInTheDocument();
  });

  test('Открытие списка при клике на триггер', () => {
    renderWithRouter(<Dropdown items={items} trigger={trigger} />);

    const triggerButton = screen.getByText('Открыть');
    expect(screen.queryByText('Пункт 1')).not.toBeInTheDocument();

    fireEvent.click(triggerButton);

    expect(screen.getByText('Пункт 1')).toBeInTheDocument();
    expect(screen.getByText('Пункт 2')).toBeInTheDocument();
    expect(screen.getByText('Ссылка')).toBeInTheDocument();
  });

  test('Вызов обработчика клика на элементе', () => {
    renderWithRouter(<Dropdown items={items} trigger={trigger} />);

    const triggerButton = screen.getByText('Открыть');
    fireEvent.click(triggerButton);

    const item = screen.getByText('Пункт 1');
    fireEvent.click(item);

    expect(items[0].onclick).toHaveBeenCalled();
  });

  test('Элемент с disabled не вызывает обработчик', () => {
    renderWithRouter(<Dropdown items={items} trigger={trigger} />);

    const triggerButton = screen.getByText('Открыть');
    fireEvent.click(triggerButton);

    const disabledItem = screen.getByText('Пункт 2');
    fireEvent.click(disabledItem);

    expect(items[1].onclick).not.toHaveBeenCalled();
  });

  test('Применение дополнительного класса', () => {
    const { container } = renderWithRouter(
      <Dropdown items={items} trigger={trigger} className="custom-class" />,
    );
    const dropdown = container.firstChild;
    expect(dropdown).toHaveClass('custom-class');
  });

  test('Применение разных направлений выпадающего списка', () => {
    const directions: DropdownDirection[] = ['bottom left', 'bottom right', 'top left', 'top right'];

    directions.forEach((direction) => {
      const { container, unmount } = renderWithRouter(
        <Dropdown items={items} trigger={trigger} direction={direction} />,
      );

      const triggerButton = screen.getByText('Открыть');
      fireEvent.click(triggerButton);

      // Ищем Items по классу
      const menuItems = container.querySelector('.Items');

      // Получаем ожидаемый класс для текущего направления
      const expectedClass = mapDirectionClass[direction];

      // Проверяем наличие класса соответствующего направления
      expect(menuItems).toHaveClass(expectedClass);

      unmount();
    });
  });

  test('Рендеринг ссылки для элемента с href', () => {
    renderWithRouter(<Dropdown items={items} trigger={trigger} />);

    const triggerButton = screen.getByText('Открыть');
    fireEvent.click(triggerButton);

    const linkItem = screen.getByText('Ссылка');
    const linkContainer = linkItem.closest('a');

    expect(linkContainer).toHaveAttribute('href', '/test-link');
  });
});
