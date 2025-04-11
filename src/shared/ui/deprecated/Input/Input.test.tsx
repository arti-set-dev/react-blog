import { render, screen, fireEvent } from '@testing-library/react';
import { Input, InputTheme, InputType } from './Input';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

describe('Input', () => {
  test('Рендер компонента Input', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('Рендер с плейсхолдером', () => {
    render(<Input placeholder="Тестовый placeholder" />);
    expect(screen.getByText('Тестовый placeholder')).toBeInTheDocument();
  });

  test('Изменение значения в Input', () => {
    const onChange = jest.fn();
    render(<Input value="123" onChange={onChange} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('123');

    fireEvent.change(input, { target: { value: '12345' } });
    expect(onChange).toHaveBeenCalledWith('12345');
  });

  test('Отображение ошибки', () => {
    render(<Input error="Текст ошибки" />);

    expect(screen.getByTestId('Text.Tag')).toBeInTheDocument();
    expect(screen.getByText('Текст ошибки')).toBeInTheDocument();
  });

  test('Режим только для чтения', () => {
    render(<Input readonly value="test value" placeholder="placeholder" />);

    const input = screen.getByDisplayValue('test value');
    expect(input).toHaveAttribute('readonly');
  });

  test('Textarea вариант', () => {
    render(<Input textarea value="Многострочный текст" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  test('Изменение типа на password', () => {
    render(<Input type={InputType.PASSWORD} value="password123" />);

    const input = screen.getByDisplayValue('password123');
    expect(input).toHaveAttribute('type', 'password');
  });

  test('Применение темы Inverted', () => {
    render(<Input theme={InputTheme.INVERTED} placeholder="Тест" />);

    const span = screen.getByText('Тест');
    expect(span).toHaveClass('inverted');
  });

  test('Фокус на Input', () => {
    render(<Input placeholder="Тест фокуса" />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    const placeholder = screen.getByText('Тест фокуса');
    expect(placeholder).toHaveClass('focused');
  });

  test('Потеря фокуса при пустом Input', () => {
    render(<Input placeholder="Тест блюра" />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    const placeholder = screen.getByText('Тест блюра');
    expect(placeholder).toHaveClass('focused');

    fireEvent.blur(input);
    expect(placeholder).not.toHaveClass('focused');
  });

  test('Сохранение класса focused при заполненном Input', () => {
    const onChange = jest.fn();
    render(<Input placeholder="Тест блюра с значением" onChange={onChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Текст' } });
    onChange.mockClear();

    const placeholder = screen.getByText('Тест блюра с значением');
    expect(placeholder).toHaveClass('focused');

    Object.defineProperty(input, 'value', { value: 'Текст' });

    fireEvent.blur(input);
    expect(placeholder).toHaveClass('focused');
  });
});
