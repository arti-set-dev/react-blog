import { memo, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppToolbar } from './lib/useAppToolbar';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { initAuthData, getUserInited } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';
import { ToggleFeatures } from '@/shared/lib/features';
import { Footer } from '@/widgets/Footer';

const App = memo(() => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const inited = useSelector(getUserInited);
  const toolbar = useAppToolbar();

  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  if (!inited) {
    return (
      <div className={classNames('app app--all-center', {}, [theme])}>
        <Loader />
      </div>
    );
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={(
        <div id="app" className={classNames('app_redesigned', {}, [theme])}>
          <Suspense fallback={<Loader />}>
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
          <Suspense fallback={<Loader />}>
            <main className="main">
              <Sidebar />
              <div className="page-wrapper">
                <Navbar />
                {inited && <AppRouter />}
              </div>
            </main>
          </Suspense>
        </div>
      )}
    />

  );
});

export default withTheme(App);
