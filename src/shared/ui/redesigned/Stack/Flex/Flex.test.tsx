import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Flex } from './Flex';
import cls from './Flex.module.scss';

describe('Flex', () => {
  test('Рендер с дефолтными значениями', () => {
    componentRender(
      <Flex>
        <div>Тест</div>
      </Flex>,
    );

    const flex = screen.getByText('Тест').parentElement;
    expect(flex).toBeInTheDocument();
    expect(flex).toHaveClass(cls.Flex, cls.justifyStart, cls.alignCenter, cls.directionRow);
  });

  test('Рендер с кастомными justify и align', () => {
    componentRender(
      <Flex justify="center" align="end">
        <div>Тест</div>
      </Flex>,
    );

    const flex = screen.getByText('Тест').parentElement;
    expect(flex).toHaveClass(cls.justifyCenter, cls.alignEnd);
  });

  test('Рендер с кастомным direction', () => {
    componentRender(
      <Flex direction="column">
        <div>Тест</div>
      </Flex>,
    );

    const flex = screen.getByText('Тест').parentElement;
    expect(flex).toHaveClass(cls.directionColumn);
  });

  test('Рендер с gap', () => {
    componentRender(
      <Flex gap="8">
        <div>Тест</div>
      </Flex>,
    );

    const flex = screen.getByText('Тест').parentElement;
    expect(flex).toHaveClass(cls.gap8);
  });

  test('Рендер с fullWidth и fullHeight', () => {
    componentRender(
      <Flex fullWidth fullHeight>
        <div>Тест</div>
      </Flex>,
    );

    const flex = screen.getByText('Тест').parentElement;
    expect(flex).toHaveClass(cls.fullWidth, cls.fullHeight);
  });

  test('Рендер с кастомным тегом', () => {
    componentRender(
      <Flex tag="section">
        <div>Тест</div>
      </Flex>,
    );

    const flex = screen.getByText('Тест').parentElement;
    expect(flex?.tagName).toBe('SECTION');
  });

  test('Рендер с role', () => {
    componentRender(
      <Flex role="dialog">
        <div>Тест</div>
      </Flex>,
    );

    const flex = screen.getByText('Тест').parentElement;
    expect(flex).toHaveAttribute('role', 'dialog');
  });

  test('Рендер с overflow', () => {
    componentRender(
      <Flex overflow="hidden">
        <div>Тест</div>
      </Flex>,
    );

    const flex = screen.getByText('Тест').parentElement;
    expect(flex).toHaveClass(cls.overflowHidden);
  });

  test('Рендер с размерами', () => {
    componentRender(
      <Flex width={100} height={200}>
        <div>Тест</div>
      </Flex>,
    );

    const flex = screen.getByText('Тест').parentElement;
    expect(flex).toHaveStyle({
      maxWidth: '100px',
      height: '200px',
    });
  });

  test('Рендер с flexBasis', () => {
    componentRender(
      <Flex flexBasis="50%">
        <div>Тест</div>
      </Flex>,
    );

    const flex = screen.getByText('Тест').parentElement;
    expect(flex).toHaveStyle({
      flexBasis: '50%',
    });
  });

  test('Рендер с listVariant', () => {
    componentRender(
      <Flex listVariant="number">
        <div>Тест</div>
      </Flex>,
    );

    const flex = screen.getByText('Тест').parentElement;
    expect(flex).toHaveClass(cls.number);
  });

  test('Рендер с дополнительным классом', () => {
    componentRender(
      <Flex className="custom-class">
        <div>Тест</div>
      </Flex>,
    );

    const flex = screen.getByText('Тест').parentElement;
    expect(flex).toHaveClass('custom-class');
  });
});
