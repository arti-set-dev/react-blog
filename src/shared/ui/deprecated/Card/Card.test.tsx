import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Card } from './Card';

describe('Card', () => {
  test('Рендер с текстовым содержимым', () => {
    componentRender(<Card>Тестовая карточка</Card>);

    expect(screen.getByText('Тестовая карточка')).toBeInTheDocument();
  });

  test('Рендер с дочерним компонентом', () => {
    componentRender(
      <Card>
        <div data-testid="child-element">Дочерний элемент</div>
      </Card>,
    );

    expect(screen.getByTestId('child-element')).toBeInTheDocument();
  });

  test('Рендер с дополнительным классом', () => {
    componentRender(
      <Card className="custom-class">Содержимое карточки</Card>,
    );

    const card = screen.getByText('Содержимое карточки').closest('article');
    expect(card).toHaveClass('custom-class');
  });

  test('Рендер с классом hovered', () => {
    componentRender(
      <Card isHovered>Содержимое карточки</Card>,
    );

    const card = screen.getByText('Содержимое карточки').closest('article');
    expect(card).toHaveClass('hovered');
  });

  test('Рендер с классом offset', () => {
    componentRender(
      <Card isOffset>Содержимое карточки</Card>,
    );

    const card = screen.getByText('Содержимое карточки').closest('article');
    expect(card).toHaveClass('offset');
  });

  test('Рендер с обоими классами hovered и offset', () => {
    componentRender(
      <Card isHovered isOffset>Содержимое карточки</Card>,
    );

    const card = screen.getByText('Содержимое карточки').closest('article');
    expect(card).toHaveClass('hovered');
    expect(card).toHaveClass('offset');
  });

  test('Передача дополнительных пропсов', () => {
    componentRender(
      <Card data-testid="card-element">Содержимое карточки</Card>,
    );

    const card = screen.getByTestId('card-element');
    expect(card).toBeInTheDocument();
    expect(card.tagName).toBe('ARTICLE');
  });
});
