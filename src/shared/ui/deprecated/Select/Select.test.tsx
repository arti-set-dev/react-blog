import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';
import cl from './Select.module.scss';

describe('Select', () => {
  const options = [
    { value: 'value1', content: 'Содержимое 1' },
    { value: 'value2', content: 'Содержимое 2' },
    { value: 'value3', content: 'Содержимое 3' },
  ];

  test('Рендер компонента Select', () => {
    render(<Select options={options} />);

    options.forEach((option) => {
      expect(screen.getByText(option.content)).toBeInTheDocument();
    });
  });

  test('Рендер с меткой (label)', () => {
    render(<Select options={options} label="Тестовая метка" />);

    expect(screen.getByText('Тестовая метка')).toBeInTheDocument();
    expect(screen.getByText('Тестовая метка').closest(`.${cl.SelectWrapper}`)).toBeInTheDocument();
  });

  test('Выбор значения', () => {
    const onChange = jest.fn();
    render(
      <Select
        options={options}
        onChange={onChange}
        currValue={options[0].value}
      />,
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: options[1].value } });

    expect(onChange).toHaveBeenCalledWith(options[1].value);
  });

  test('Режим readonly', () => {
    render(
      <Select
        options={options}
        readonly
      />,
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
    expect(select).toHaveClass(cl.readonly);
  });

  test('Применение дополнительного класса', () => {
    render(
      <Select
        options={options}
        className="custom-class"
      />,
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('custom-class');
  });

  test('Отображение всех опций', () => {
    render(
      <Select
        options={options}
        currValue={options[1].value}
      />,
    );

    options.forEach((option) => {
      const optionElement = screen.getByText(option.content);
      expect(optionElement).toBeInTheDocument();
      expect(optionElement.tagName.toLowerCase()).toBe('option');
      expect(optionElement).toHaveValue(option.value);
    });
  });

  test('Рендер без метки', () => {
    const { container } = render(<Select options={options} />);

    expect(container.querySelector(`.${cl.SelectWrapper}`)).not.toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
