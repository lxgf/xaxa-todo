import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './ToDo/App';
import firebase from "firebase/compat";
import 'firebase/firestore';
import 'firebase/auth';


firebase.initializeApp({
    apiKey: "AIzaSyBdXi7qAucBHcqNJ8sb73ayHstruw8w94w",
    authDomain: "xaxa-todo.firebaseapp.com",
    databaseURL: "https://xaxa-todo-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "xaxa-todo",
    storageBucket: "xaxa-todo.appspot.com",
    messagingSenderId: "920237973099",
    appId: "1:920237973099:web:2facf494e0d9818e495b2e",
    measurementId: "G-G21E1J5GFF"
})

export const Context = createContext(null)

const auth = firebase.auth();
const firestore = firebase.firestore();

ReactDOM.render(
    <Context.Provider value={{
        firebase,
        auth,
        firestore
    }}>
        <App />
    </Context.Provider>,
    document.getElementById('root')
);