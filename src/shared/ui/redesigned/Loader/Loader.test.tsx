import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';
import cl from './Loader.module.scss';

describe('Loader', () => {
  test('Рендер с дефолтными значениями', () => {
    render(<Loader />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass(cl.Loader);
    expect(loader).toHaveClass(cl.primary);
  });

  test('Рендер с дополнительным классом', () => {
    render(<Loader className="test-class" />);
    const loader = screen.getByTestId('loader');
    expect(loader).toHaveClass(cl.Loader, 'test-class');
  });

  test('Рендер с вариантом inverted', () => {
    render(<Loader variant="inverted" />);
    const loader = screen.getByTestId('loader');
    expect(loader).toHaveClass(cl.inverted);
  });

  test('Рендер с вариантом primary', () => {
    render(<Loader variant="primary" />);
    const loader = screen.getByTestId('loader');
    expect(loader).toHaveClass(cl.primary);
  });
});
