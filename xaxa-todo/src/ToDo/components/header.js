import React, {useContext} from 'react';
import '../styles/header.css';
import {Logo} from "./logo";
import {Context} from "../../index";

export const Header = () => {
    const {auth} = useContext(Context);

    return (
        <div className="header">
            <Logo />
            <a onClick={() => auth.signOut()} className="header__button">Выйти</a>
        </div>
    );
};

