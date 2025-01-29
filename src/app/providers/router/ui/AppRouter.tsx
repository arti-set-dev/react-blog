import React, { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loader, LoaderOffset } from '@/shared/ui/deprecated/Loader';
import { routeConfig } from '../config/routeConfig';
import { AppRoutesProps } from '@/shared/types/router';
import { RequireAuth } from './RequireAuth';

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<Loader offset={LoaderOffset.AUTO} />}>
        {route.element}
      </Suspense>
    );
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? (
            <RequireAuth roles={route.roles}>{element}</RequireAuth>
          ) : (
            element
          )
        }
      />
    );
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
