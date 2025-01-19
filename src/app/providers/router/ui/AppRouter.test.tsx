import { screen } from '@testing-library/react';
import { UserRole } from '@/entities/User';
import { getRouteAbout, getRouteProfile, getRouteAdminPanel } from '@/shared/const/router';
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
    });

    const page = await screen.findByTestId('MainPage');
    expect(page).toBeInTheDocument();
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

  test('access denied (role missing)', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdminPanel(),
      initialState: {
        user: { _inited: true, authData: {} },
      },
    });

    const page = await screen.findByTestId('ForbiddenPage');
    expect(page).toBeInTheDocument();
  });

  test('access allowed (role present)', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdminPanel(),
      initialState: {
        user: { _inited: true, authData: { roles: [UserRole.ADMIN] } },
      },
    });

    const page = await screen.findByTestId('AdminPanelPage');
    expect(page).toBeInTheDocument();
  });
});
