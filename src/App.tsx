import { Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Counter from "./components/Counter";
import './styles/index.scss';
import AboutPage from "./pages/AboutPage/AboutPage";
import { AboutPageAsync } from "./pages/AboutPage/AboutPage.async";
import MainPage from "./pages/MainPage/MainPage";
import { MainPageAsync } from "./pages/MainPage/MainPage.async";
import { useTheme } from "./theme/useTheme";
import { classNames } from "./helpers/classNames/classNames";

const App = () => {
    const {theme, toggleTheme} = useTheme();
    
    return (
        <div className={classNames('app', {}, [theme])}>
            <button onClick={toggleTheme}>toggleTheme</button>
            <Link to={'/'}>Main</Link>
            <Link to={'/about'}>About</Link>
            <Suspense fallback={<div>loading...</div>}>
                <Routes>
                    <Route path={'/'} element={<MainPageAsync />} />
                    <Route path={'/about'} element={<AboutPageAsync />} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;