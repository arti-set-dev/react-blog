import { screen, fireEvent } from '@testing-library/react';
import { Listbox } from './ListBox';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

describe('Listbox', () => {
  const items = [
    { value: '1', content: 'Пункт 1' },
    { value: '2', content: 'Пункт 2' },
    { value: '3', content: 'Пункт 3', disabled: true },
  ];

  test('Рендер с дефолтными значениями', () => {
    componentRender(
      <Listbox
        items={items}
        value="1"
        onChange={() => {}}
        defaultValue="Выберите значение"
      />,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('Открытие и закрытие списка', () => {
    componentRender(
      <Listbox
        items={items}
        value="1"
        onChange={() => {}}
        defaultValue="Выберите значение"
      />,
    );

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent('Пункт 1');
    expect(options[1]).toHaveTextContent('Пункт 2');
    expect(options[2]).toHaveTextContent('Пункт 3');

    fireEvent.click(trigger);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('Выбор значения из списка', () => {
    const onChange = jest.fn();
    componentRender(
      <Listbox
        items={items}
        value="1"
        onChange={onChange}
        defaultValue="Выберите значение"
      />,
    );

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const options = screen.getAllByRole('option');
    fireEvent.click(options[1]);

    expect(onChange).toHaveBeenCalledWith('2');
  });

  test('Отключенный пункт не может быть выбран', () => {
    const onChange = jest.fn();
    componentRender(
      <Listbox
        items={items}
        value="1"
        onChange={onChange}
        defaultValue="Выберите значение"
      />,
    );

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const options = screen.getAllByRole('option');
    const disabledOption = options[2];
    expect(disabledOption).toHaveClass('disabled');
    fireEvent.click(disabledOption);

    expect(onChange).not.toHaveBeenCalled();
  });

  test('Рендер с меткой', () => {
    componentRender(
      <Listbox
        items={items}
        value="1"
        onChange={() => {}}
        defaultValue="Выберите значение"
        label="Тестовая метка"
      />,
    );

    expect(screen.getByText('Тестовая метка')).toBeInTheDocument();
  });

  test('Рендер в режиме readonly', () => {
    componentRender(
      <Listbox
        items={items}
        value="1"
        onChange={() => {}}
        defaultValue="Выберите значение"
        readonly
      />,
    );

    const trigger = screen.getByRole('button');
    expect(trigger).toBeDisabled();
  });

  test('Рендер с кастомной шириной', () => {
    componentRender(
      <Listbox
        items={items}
        value="1"
        onChange={() => {}}
        defaultValue="Выберите значение"
        width={200}
      />,
    );

    const popup = screen.getByRole('button').closest('.Popup');
    expect(popup).toHaveStyle({ maxWidth: '200px' });
  });

  test('Рендер с разными вариантами оформления', () => {
    componentRender(
      <Listbox
        items={items}
        value="1"
        onChange={() => {}}
        defaultValue="Выберите значение"
        variant="outline"
        background="dark"
      />,
    );

    const trigger = screen.getByRole('button');
    expect(trigger).toHaveClass('outline', 'dark');
  });
});
