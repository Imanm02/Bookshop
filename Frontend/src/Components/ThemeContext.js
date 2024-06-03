import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../index";


const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
};

export function get_user_id() {
    if (!localStorage.getItem('token')) return 0;
    if (localStorage.getItem('token')==='undefined') return 0;
    return '';
}

export const ManualThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(null);

    useEffect(() => {
        axios.get(BASE_URL + 'user/' + get_user_id() + '/')
            .then(response => {
                setDarkMode(response.data['dark']);
                document.body.style.backgroundColor = response.data['dark']? '#333333': '#cccccc';
            })
            .catch(error => setDarkMode(false));
    }, []);

    const toggleTheme = () => {
        document.body.style.backgroundColor = darkMode? '#cccccc': '#333333';
        axios.post(BASE_URL + 'user/' + get_user_id() + '/', {'theme': !darkMode})
            .then(() => setDarkMode(!darkMode))
            .catch(error => console.log(error.response.status));
    };

    const value = {
        darkMode,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
