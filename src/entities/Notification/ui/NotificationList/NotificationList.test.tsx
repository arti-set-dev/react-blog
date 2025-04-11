import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { NotificationList } from './NotificationList';

const mockNotifications = [
  {
    id: '1',
    title: 'Test notification 1',
    description: 'Test description 1',
    href: '/test1',
  },
  {
    id: '2',
    title: 'Test notification 2',
    description: 'Test description 2',
    href: '/test2',
  },
];

describe('NotificationList', () => {
  test('Рендер списка уведомлений', () => {
    componentRender(<NotificationList notifications={mockNotifications} />);

    expect(screen.getByText('Test notification 1')).toBeInTheDocument();
    expect(screen.getByText('Test description 1')).toBeInTheDocument();
    expect(screen.getByText('Test notification 2')).toBeInTheDocument();
    expect(screen.getByText('Test description 2')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  test('Рендер состояния загрузки', () => {
    componentRender(<NotificationList isLoading />);

    expect(screen.getAllByTestId('skeleton')).toHaveLength(4);
  });

  test('Рендер состояния ошибки', () => {
    componentRender(<NotificationList error="Error" />);

    expect(screen.getByText('There was an error loading notifications')).toBeInTheDocument();
  });

  test('Рендер пустого списка', () => {
    componentRender(<NotificationList notifications={[]} />);

    expect(screen.getByText('No notifications')).toBeInTheDocument();
  });

  test('Рендер с UI свитчером', () => {
    const mockUiSwitcher = <div data-testid="ui-switcher">UI Switcher</div>;
    componentRender(
      <NotificationList
        notifications={[{ ...mockNotifications[0], isUiSwitch: true }]}
        uiSwitcher={mockUiSwitcher}
      />,
    );

    expect(screen.getByTestId('ui-switcher')).toBeInTheDocument();
  });
});
