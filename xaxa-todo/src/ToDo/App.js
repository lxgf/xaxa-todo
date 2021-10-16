import React, {useContext} from 'react';
import './styles/main.css';
import {Main} from './components/main.js'
import {BrowserRouter, Route} from "react-router-dom";
import Router from "./components/router";
import AppRouter from "./components/router";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "./components/loader";


const App = () => {
    const {auth} = useContext(Context);
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return <Loader />
    }

    return(
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
};

export default App;