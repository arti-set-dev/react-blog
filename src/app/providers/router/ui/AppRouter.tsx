import React, { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loader as LoaderRedesigned } from '@/shared/ui/redesigned/Loader';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { routeConfig } from '../config/routeConfig';
import { AppRoutesProps } from '@/shared/types/router';
import { RequireAuth } from './RequireAuth';
import { ToggleFeatures } from '@/shared/lib/features';

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const appRouterLoader = (
      <div className="app-router-wrapper">
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<LoaderRedesigned />}
          off={<Loader />}
        />
      </div>
    );

    const element = (
      <Suspense fallback={appRouterLoader}>
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
