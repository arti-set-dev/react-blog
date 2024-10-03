import { Suspense, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import './styles/index.scss';
import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "./providers/ThemeProvider";
import { AboutPage } from "pages/AboutPage";
import { MainPage } from "pages/MainPage";
import { AppRouter } from "./providers/router";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar/ui";
import { useTranslation } from "react-i18next";
import { LanguageSwither } from "widgets/LanguageSwither";

const App = () => {
    const { theme } = useTheme();

    return (
        <div className={classNames('App', {}, [theme])}>
            <Suspense fallback={<div>loading...</div>}>
                <Navbar />
                <div className="page-content">
                    <Sidebar/>
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
}

export default App;