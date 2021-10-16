import React, {useContext} from 'react';
import '../styles/login.css';
import {Logo} from "./logo";
// import {Context} from "../../index";
// import firebase from "firebase/compat";

export const Login = () => {
//     const {auth} = useContext(Context);
//     const login = async () => {
//         const provider = new firebase.auth.GoogleAuthProvider();
//         const {user} = await auth.signInWithPopup(provider);
//         console.log(user)
//     }

    return (
        <div className="login-form">
            <Logo />
            <div className="login-form__text">Для использования приложения вам необходимо залогиниться</div>
            <a  className="login-form__button">Войти с помощью Google</a>
        </div>
    );
};

