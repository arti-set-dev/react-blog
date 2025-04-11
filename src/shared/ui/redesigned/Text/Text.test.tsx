import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Text } from './Text';

describe('Text', () => {
  test('Рендер с дефолтными значениями', () => {
    componentRender(<Text>Test content</Text>);

    const text = screen.getByTestId('Text.Tag');
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('Test content');
    expect(text.tagName).toBe('DIV');
    expect(text).toHaveClass('Text', 'normal', 's', 'primary', 'left');
  });

  test('Рендер с разными размерами', () => {
    componentRender(
      <>
        <Text size="xxs">xxs text</Text>
        <Text size="xs">xs text</Text>
        <Text size="s">s text</Text>
        <Text size="m">m text</Text>
        <Text size="l">l text</Text>
        <Text size="xl">xl text</Text>
        <Text size="xxl">xxl text</Text>
      </>,
    );

    expect(screen.getByText('xxs text')).toHaveClass('xxs');
    expect(screen.getByText('xs text')).toHaveClass('xs');
    expect(screen.getByText('s text')).toHaveClass('s');
    expect(screen.getByText('m text')).toHaveClass('m');
    expect(screen.getByText('l text')).toHaveClass('l');
    expect(screen.getByText('xl text')).toHaveClass('xl');
    expect(screen.getByText('xxl text')).toHaveClass('xxl');
  });

  test('Рендер с разными вариантами', () => {
    componentRender(
      <>
        <Text variant="error">error text</Text>
        <Text variant="primary">primary text</Text>
        <Text variant="inverted">inverted text</Text>
        <Text variant="primary-light">primary-light text</Text>
        <Text variant="primary-accent">primary-accent text</Text>
      </>,
    );

    expect(screen.getByText('error text')).toHaveClass('error');
    expect(screen.getByText('primary text')).toHaveClass('primary');
    expect(screen.getByText('inverted text')).toHaveClass('inverted');
    expect(screen.getByText('primary-light text')).toHaveClass('primary-light');
    expect(screen.getByText('primary-accent text')).toHaveClass('primary-accent');
  });

  test('Рендер с разным выравниванием', () => {
    componentRender(
      <>
        <Text align="left">left text</Text>
        <Text align="center">center text</Text>
        <Text align="right">right text</Text>
      </>,
    );

    expect(screen.getByText('left text')).toHaveClass('left');
    expect(screen.getByText('center text')).toHaveClass('center');
    expect(screen.getByText('right text')).toHaveClass('right');
  });

  test('Рендер с разными тегами', () => {
    componentRender(
      <>
        <Text tag="h1">h1 text</Text>
        <Text tag="h2">h2 text</Text>
        <Text tag="h3">h3 text</Text>
        <Text tag="p">p text</Text>
        <Text tag="span">span text</Text>
      </>,
    );

    expect(screen.getByText('h1 text').tagName).toBe('H1');
    expect(screen.getByText('h2 text').tagName).toBe('H2');
    expect(screen.getByText('h3 text').tagName).toBe('H3');
    expect(screen.getByText('p text').tagName).toBe('P');
    expect(screen.getByText('span text').tagName).toBe('SPAN');
  });

  test('Рендер с обрезкой текста', () => {
    componentRender(
      <>
        <Text cropped="1">cropped 1 text</Text>
        <Text cropped="2">cropped 2 text</Text>
        <Text cropped="3">cropped 3 text</Text>
      </>,
    );

    expect(screen.getByText('cropped 1 text')).toHaveClass('cropped', 'cropped_1');
    expect(screen.getByText('cropped 2 text')).toHaveClass('cropped', 'cropped_2');
    expect(screen.getByText('cropped 3 text')).toHaveClass('cropped', 'cropped_3');
  });

  test('Рендер с разным весом текста', () => {
    componentRender(
      <>
        <Text weight="normal">normal text</Text>
        <Text weight="bold">bold text</Text>
      </>,
    );

    expect(screen.getByText('normal text')).toHaveClass('normal');
    expect(screen.getByText('bold text')).toHaveClass('bold');
  });

  test('Рендер с hover эффектом', () => {
    componentRender(<Text isHovered>hovered text</Text>);

    expect(screen.getByText('hovered text')).toHaveClass('isHovered');
  });

  test('Рендер с дополнительным классом', () => {
    componentRender(<Text className="custom-class">custom class text</Text>);

    expect(screen.getByText('custom class text')).toHaveClass('custom-class');
  });

  test('Рендер с кастомным data-testid', () => {
    componentRender(<Text data-testid="CustomText">custom testid text</Text>);

    expect(screen.getByTestId('CustomText.Tag')).toBeInTheDocument();
  });
});
