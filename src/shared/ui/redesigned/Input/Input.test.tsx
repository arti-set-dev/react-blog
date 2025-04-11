import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';
import cl from './Input.module.scss';

describe('Input', () => {
  test('Рендер с дефолтными значениями', () => {
    render(<Input />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(cl.Input, cl.lined);
  });

  test('Рендер с placeholder', () => {
    render(<Input placeholder="Test placeholder" />);

    const placeholder = screen.getByText('Test placeholder');
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toHaveClass(cl.InputPlaceholder);
  });

  test('Рендер с разными вариантами отображения', () => {
    const { rerender } = render(<Input variant="lined" />);
    let input = screen.getByRole('textbox');
    expect(input).toHaveClass(cl.lined);

    rerender(<Input variant="outlined" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveClass(cl.outlined);
  });

  test('Отображение ошибки', () => {
    render(<Input error="Test error" />);

    const errorElement = screen.getByTestId('Input.Error.Tag');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent('Test error');
    expect(screen.getByRole('textbox')).toHaveClass(cl.error);
  });

  test('Режим readonly', () => {
    render(<Input readonly value="Test value" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
    expect(input).toHaveClass(cl.readonly);
  });

  test('Рендер textarea', () => {
    render(<Input textarea placeholder="Test textarea" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveClass(cl.textarea);
  });

  test('Обработка изменений значения', async () => {
    const onChangeMock = jest.fn();
    render(<Input onChange={onChangeMock} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'test');

    expect(onChangeMock).toHaveBeenCalledTimes(4);
    expect(onChangeMock.mock.calls).toEqual([
      ['t'],
      ['e'],
      ['s'],
      ['t'],
    ]);
  });

  test('Автофокус', () => {
    const { container } = render(<Input autofocus />);

    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
  });

  test('Разные типы инпута', () => {
    const { container, rerender } = render(<Input type="text" />);
    let input = container.querySelector('input');
    expect(input).toHaveAttribute('type', 'text');

    rerender(<Input type="password" />);
    input = container.querySelector('input');
    expect(input).toHaveAttribute('type', 'password');

    rerender(<Input type="number" />);
    input = container.querySelector('input');
    expect(input).toHaveAttribute('type', 'number');
  });

  test('Работа с фокусом и placeholder', async () => {
    render(<Input placeholder="Test placeholder" />);

    const input = screen.getByRole('textbox');
    const placeholder = screen.getByText('Test placeholder');

    await userEvent.click(input);
    expect(placeholder).toHaveClass(cl.focused);

    await userEvent.tab();
    expect(placeholder).not.toHaveClass(cl.focused);

    await userEvent.type(input, 'test');
    expect(placeholder).toHaveClass(cl.focused);
  });

  test('Рендер с addon', () => {
    render(<Input addon={<div data-testid="test-addon">Addon</div>} />);

    const addon = screen.getByTestId('test-addon');
    expect(addon).toBeInTheDocument();
    expect(addon.parentElement).toHaveClass(cl.Addon);
  });
});
