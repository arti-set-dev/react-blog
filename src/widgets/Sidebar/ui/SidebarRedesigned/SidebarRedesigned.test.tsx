import { userEvent } from '@storybook/testing-library';
import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { SidebarRedesigned } from './SidebarRedesigned';

describe('SidebarRedesigned', () => {
  test('Рендер компонента', () => {
    componentRender(<SidebarRedesigned />);

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-toggle')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  test('Переключение состояния sidebar', async () => {
    componentRender(<SidebarRedesigned />);

    const toggleButton = screen.getByTestId('sidebar-toggle');
    const sidebar = screen.getByTestId('sidebar');

    expect(sidebar).not.toHaveClass('collapsed');

    await userEvent.click(toggleButton);
    expect(sidebar).toHaveClass('collapsed');

    await userEvent.click(toggleButton);
    expect(sidebar).not.toHaveClass('collapsed');
  });

  test('Наличие переключателей темы и языка', () => {
    componentRender(<SidebarRedesigned />);

    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /language/i })).toBeInTheDocument();
  });

  test('Рендер навигационных элементов', () => {
    componentRender(<SidebarRedesigned />);

    const navList = screen.getByRole('list');
    expect(navList).toBeInTheDocument();
    expect(navList.children.length).toBeGreaterThan(0);
  });
});
