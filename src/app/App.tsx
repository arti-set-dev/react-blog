import { Suspense, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import 'app/styles/index.scss';
import { AboutPageAsync } from 'pages/AboutPage/ui/AboutPage.async';
import { MainPageAsync } from 'pages/MainPage/ui/MainPage.async';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProveder/lib/useTheme';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback={<div>loading...</div>}>
        <Navbar />
        <main className="main">
          <Sidebar />
          <AppRouter />
        </main>
      </Suspense>
    </div>
  );
};

export default App;
