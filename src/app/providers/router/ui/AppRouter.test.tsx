import { screen } from '@testing-library/react';
import {
  getRouteAbout,
  getRouteProfile,
} from '@/shared/const/router';
import AppRouter from './AppRouter';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

describe('app/router/AppRouter', () => {
  test('should render AppRouter', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAbout(),
    });

    const page = await screen.findByTestId('AboutPage');
    expect(page).toBeInTheDocument();
  });

  test('page not found', async () => {
    componentRender(<AppRouter />, {
      route: '/yfstqfstqfs',
    });

    const page = await screen.findByTestId('NotFoundPage');
    expect(page).toBeInTheDocument();
  });

  test('redirect an unauthorized user to the home page', async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile('1'),
      initialState: {
        user: { _inited: true, authData: undefined },
      },
    });

    expect(screen.queryByTestId('ProfilePage')).not.toBeInTheDocument();
  });

  test('access to a closed page for an authorized user', async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile('1'),
      initialState: {
        user: { _inited: true, authData: {} },
      },
    });

    const page = await screen.findByTestId('ProfilePage');
    expect(page).toBeInTheDocument();
  });
});
