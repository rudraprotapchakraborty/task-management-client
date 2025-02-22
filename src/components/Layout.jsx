import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"

const Layout = () => {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);

    return (
        <div className={darkMode ? "bg-gray-800" : "bg-gray-50"}>
            <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            <Outlet />
        </div>
    );
};

export default Layout;