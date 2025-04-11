import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { NotificationItem } from './NotificationItem';

const mockNotification = {
  id: '1',
  title: 'Test notification',
  description: 'Test description',
  href: '/test',
};

describe('NotificationItem', () => {
  test('Рендер компонента с базовыми пропсами', () => {
    componentRender(<NotificationItem notification={mockNotification} />);

    expect(screen.getByText('Test notification')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test');
  });

  test('Рендер компонента с UI свитчером', () => {
    const mockUiSwitcher = <div data-testid="ui-switcher">UI Switcher</div>;
    componentRender(
      <NotificationItem
        notification={{ ...mockNotification, isUiSwitch: true }}
        uiSwitcher={mockUiSwitcher}
      />,
    );

    expect(screen.getByTestId('ui-switcher')).toBeInTheDocument();
  });

  test('Рендер компонента без ссылки', () => {
    const notificationWithoutHref = {
      ...mockNotification,
      href: undefined,
    };

    componentRender(<NotificationItem notification={notificationWithoutHref} />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  test('Рендер компонента с дополнительным классом', () => {
    componentRender(
      <NotificationItem
        notification={mockNotification}
        className="test-class"
      />,
    );

    const notificationItem = screen.getByRole('listitem');
    expect(notificationItem.className).toContain('Card');
    expect(notificationItem.className).toContain('gap-8');
    expect(notificationItem.className).toContain('max');
  });
});
