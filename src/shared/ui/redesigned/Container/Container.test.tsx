import { render, screen } from '@testing-library/react';
import { Container } from './Container';
import cl from './Container.module.scss';

describe('Container', () => {
  test('Рендер с дефолтными значениями', () => {
    render(<Container>Test content</Container>);

    const container = screen.getByText('Test content');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(cl.Container);
    expect(container).not.toHaveClass(cl.max);
  });

  test('Рендер с дополнительным классом', () => {
    render(<Container className="custom-class">Test content</Container>);

    const container = screen.getByText('Test content');
    expect(container).toHaveClass(cl.Container, 'custom-class');
  });

  test('Рендер с максимальной шириной', () => {
    render(<Container max>Test content</Container>);

    const container = screen.getByText('Test content');
    expect(container).toHaveClass(cl.Container, cl.max);
  });
});
