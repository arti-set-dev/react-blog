import { render, screen } from '@testing-library/react';
import {
  Text,
  TextAlign,
  TextSize,
  TextTheme,
  TextWeight,
} from './Text';
import cl from './Text.module.scss';

describe('Text', () => {
  test('Рендер компонента Text', () => {
    render(<Text>Test content</Text>);
    const element = screen.getByTestId('Text.Tag');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Test content');
  });

  test('Применение дополнительного класса', () => {
    render(<Text className="custom-class">Test content</Text>);
    const element = screen.getByTestId('Text.Tag');
    expect(element).toHaveClass('custom-class');
  });

  describe('Размеры текста', () => {
    test.each(Object.values(TextSize))('размер %s', (size) => {
      render(<Text size={size}>Test content</Text>);
      const element = screen.getByTestId('Text.Tag');
      expect(element).toHaveClass(cl[size]);
    });
  });

  describe('Темы текста', () => {
    test.each(Object.values(TextTheme))('тема %s', (theme) => {
      render(<Text theme={theme}>Test content</Text>);
      const element = screen.getByTestId('Text.Tag');
      expect(element).toHaveClass(cl[theme]);
    });
  });

  describe('Выравнивание текста', () => {
    test.each(Object.values(TextAlign))('выравнивание %s', (align) => {
      render(<Text align={align}>Test content</Text>);
      const element = screen.getByTestId('Text.Tag');
      expect(element).toHaveClass(cl[align]);
    });
  });

  describe('Начертание текста', () => {
    test.each(Object.values(TextWeight))('начертание %s', (weight) => {
      render(<Text weight={weight}>Test content</Text>);
      const element = screen.getByTestId('Text.Tag');
      expect(element).toHaveClass(cl[weight]);
    });
  });

  test('Обрезка текста', () => {
    render(<Text cropped="3">Test content</Text>);
    const element = screen.getByTestId('Text.Tag');
    expect(element).toHaveClass(cl.cropped);
    expect(element).toHaveClass(cl.cropped_3);
  });

  describe('HTML теги', () => {
    const tags = ['h1', 'h2', 'h3', 'p', 'strong', 'b', 'div'] as const;
    test.each(tags)('тег %s', (tag) => {
      render(<Text tag={tag}>Test content</Text>);
      const element = screen.getByTestId('Text.Tag');
      expect(element.tagName.toLowerCase()).toBe(tag);
    });
  });

  test('Пользовательский data-testid', () => {
    render(<Text data-testid="custom-test-id">Test content</Text>);
    const element = screen.getByTestId('custom-test-id.Tag');
    expect(element).toBeInTheDocument();
  });

  test('Значения по умолчанию', () => {
    render(<Text>Test content</Text>);
    const element = screen.getByTestId('Text.Tag');
    expect(element).toHaveClass(cl[TextSize.S]);
    expect(element).toHaveClass(cl[TextTheme.PRIMARY]);
    expect(element).toHaveClass(cl[TextWeight.REGULAR]);
    expect(element).toHaveClass(cl[TextAlign.LEFT]);
    expect(element.tagName.toLowerCase()).toBe('div');
  });
});
