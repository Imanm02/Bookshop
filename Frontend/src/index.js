import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom';
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import PassRecovery from "./Components/PassRecovery";
import VerificationPage from "./Components/VerificationPage";
import CommandPage from "./Components/CommandPage";
import ReportPage from "./Components/ReportPage";
import SchedulePage from "./Components/SchedulePage";
import ConditionPage from "./Components/ConditionPage";
import {ManualThemeProvider} from "./Components/ThemeContext";
import Tutorial from "./Components/Tutorial";
import PasscodePage from "./Components/PasscodePage";
import ProfilePage from "./Components/ProfilePage";
import EspNodes from "./Components/EspNodes";
import AddBook from "./Components/AddBook";
import Cart from "./Components/Cart";

export const BASE_URL = 'http://127.0.0.1:8000/';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <ManualThemeProvider>
        <Router>
            <Routes>
                <Route exact path='/' element={<App />} />
                <Route path='/book/:id' element={<EspNodes />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/addBook' element={<AddBook />} />
                <Route path='/signIn' element={<SignIn />} />
                <Route path='/signUp' element={<SignUp />} />
                <Route path='/passRec' element={<PassRecovery />} />
                <Route path='/verify' element={<VerificationPage />} />
                <Route path='/pass' element={<PasscodePage />} />
                <Route path='/Help' element={<Tutorial />} />
                <Route path='/Profile' element={<ProfilePage />} />
                <Route path='/CommandPage' element={<CommandPage />} />
                <Route path='/ReportPage' element={<ReportPage />} />
                <Route path='/TaskSchedule' element={<SchedulePage />} />
                <Route path='/ConditionPage' element={<ConditionPage />} />
            </Routes>
        </Router>
    </ManualThemeProvider>
);

reportWebVitals();
