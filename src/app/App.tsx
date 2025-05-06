import { memo, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppToolbar } from './lib/useAppToolbar';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Loader as LoaderRedesigned } from '@/shared/ui/redesigned/Loader';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';
import { ToggleFeatures } from '@/shared/lib/features';
import { Footer } from '@/widgets/Footer';
import { useAppTitle } from './lib/useAppTitle';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { getUserInited, initAuthData } from '@/entities/User';

const App = memo(() => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);
  const toolbar = useAppToolbar();

  useAppTitle();

  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  if (!inited) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={(
          <div className={classNames('app_redesigned', {}, [theme])}>
            <AppLoaderLayout />
          </div>
        )}
        off={(
          <div className={classNames('app app--all-center', {}, [theme])}>
            <Loader />
          </div>
        )}
      />
    );
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <div id="app" className={classNames('app_redesigned', {}, [theme])}>
          <Suspense fallback={<LoaderRedesigned />}>
            <MainLayout
              header={<Navbar />}
              content={<AppRouter />}
              sidebar={<Sidebar />}
              toolbar={toolbar}
              footer={<Footer />}
            />
          </Suspense>
        </div>
      )}
      off={(
        <div id="app" className={classNames('app', {}, [theme])}>
          <main className="main">
            <Suspense fallback={(
              <div className="main-wrapper">
                <Loader />
              </div>
            )}
            >
              <Sidebar />
              <div className="page-wrapper">
                <Navbar />
                {inited && <AppRouter />}
              </div>
            </Suspense>
          </main>
        </div>
      )}
    />

  );
});

export default withTheme(App);
