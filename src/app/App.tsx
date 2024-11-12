import { Suspense, useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import 'app/styles/index.scss';
import { AboutPageAsync } from 'pages/AboutPage/ui/AboutPage.async';
import { MainPageAsync } from 'pages/MainPage/ui/MainPage.async';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useTranslation } from 'react-i18next';
import { Loader } from 'shared/ui/Loader/Loader';
import { Modal } from 'shared/ui/Modal/Modal';
import { useDispatch } from 'react-redux';
import { userActions } from 'entitie/User';

const App = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback={<Loader />}>
        <Navbar />
        <main className="main">
          <Sidebar />
          <div className="page-content">
            <AppRouter />
          </div>
        </main>
      </Suspense>
    </div>
  );
};

export default App;
