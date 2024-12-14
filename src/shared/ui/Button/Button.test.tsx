import { render, screen } from '@testing-library/react';
import { Button, ButtonTheme } from './Button';

describe('Button', () => {
  test('Test render', () => {
    render(<Button>Test</Button>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('Test render theme icon', () => {
    render(<Button theme={ButtonTheme.ICON}>Test</Button>);
    expect(screen.getByText('Test')).toHaveClass('icon');
    screen.debug();
  });
});
