import { screen, waitFor } from '@testing-library/react';
import { fireEvent } from '@storybook/testing-library';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  test('Test render', () => {
    componentRender(<Sidebar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('Test toggle', async () => {
    componentRender(<Sidebar />);
    const toggleBtn = screen.getByTestId('sidebar-toggle');
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    fireEvent.click(toggleBtn);
    await waitFor(() => {
      expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
  });
});
