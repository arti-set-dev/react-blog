import { render, screen, fireEvent } from '@testing-library/react';
import { Listbox, ListBoxItem } from './ListBox';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

describe('ListBox', () => {
  const items: ListBoxItem[] = [
    {
      value: 'item1',
      content: 'Элемент 1',
    },
    {
      value: 'item2',
      content: 'Элемент 2',
    },
    {
      value: 'item3',
      content: 'Элемент 3',
      disabled: true,
    },
  ];

  const onChangeMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Рендер компонента ListBox', () => {
    render(
      <Listbox
        items={items}
        onChange={onChangeMock}
        value="item1"
      />,
    );

    expect(screen.getByText('item1')).toBeInTheDocument();
  });

  test('Открытие списка при клике на триггер', () => {
    render(
      <Listbox
        items={items}
        onChange={onChangeMock}
        value="item1"
      />,
    );

    const trigger = screen.getByRole('button');

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    fireEvent.click(trigger);

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent('Элемент 1');
    expect(options[1]).toHaveTextContent('Элемент 2');
    expect(options[2]).toHaveTextContent('Элемент 3');
  });

  test('Выбор элемента из списка', () => {
    render(
      <Listbox
        items={items}
        onChange={onChangeMock}
        value="item1"
      />,
    );

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const element2 = screen.getByText('Элемент 2');
    fireEvent.click(element2);

    expect(onChangeMock).toHaveBeenCalledWith('item2');
  });

  test('Disabled элемент не должен вызывать onChange', () => {
    render(
      <Listbox
        items={items}
        onChange={onChangeMock}
        value="item1"
      />,
    );

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const disabledElement = screen.getByText('Элемент 3');
    fireEvent.click(disabledElement);

    expect(onChangeMock).not.toHaveBeenCalled();
  });

  test('Рендеринг с меткой (label)', () => {
    render(
      <Listbox
        items={items}
        onChange={onChangeMock}
        value="item1"
        label="Тестовая метка"
      />,
    );

    expect(screen.getByText('Тестовая метка')).toBeInTheDocument();
  });

  test('Рендеринг с defaultValue', () => {
    render(
      <Listbox
        items={items}
        onChange={onChangeMock}
        defaultValue="Значение по умолчанию"
      />,
    );

    expect(screen.getByText('Значение по умолчанию')).toBeInTheDocument();
  });

  test('Компонент в режиме readonly', () => {
    render(
      <Listbox
        items={items}
        onChange={onChangeMock}
        value="item1"
        readonly
      />,
    );

    const trigger = screen.getByRole('button');
    expect(trigger).toBeDisabled();
  });

  test('Применение дополнительного класса', () => {
    const { container } = render(
      <Listbox
        items={items}
        onChange={onChangeMock}
        value="item1"
        className="custom-class"
      />,
    );

    const listbox = container.firstChild;
    expect(listbox).toHaveClass('custom-class');
  });
});
