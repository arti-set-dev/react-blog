import { getUserAuthData } from 'entitie/User';
import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { memo, Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { Loader } from 'shared/ui/Loader/Loader';

const AppRouter = () => {
  const isAuth = useSelector(getUserAuthData);
  const routes = useMemo(() => Object.values(routeConfig).filter((route) => {
    if (route.authOnly && !isAuth) {
      return false;
    }

    return true;
  }), [isAuth]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {routes.map(({ element, path }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default memo(AppRouter);
