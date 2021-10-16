import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {doc, setDoc} from "@firebase/firestore";
import firebase from "firebase/compat";
import 'firebase/firestore';


const Api = (props) => {

    const db = firebase.firestore();

    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);

    db.collection('todos').doc(user.uid)
        .get()
        .then(function(doc) {
            if (doc.exists) {
                const receivedTodos = (doc.data().todos);
                const todos = (props.sendTodos);
                if (todos.length === 0) {
                    props.getTodos(receivedTodos);
                } else {
                    db.collection("todos").doc(user.uid).update({
                        todos: props.sendTodos
                    });
                }
            } else {
                db.collection('todos').doc(user.uid).set({
                    email: user.email,
                    todos: props.sendTodos
                });
            }
        }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    return (
        <div style={{textAlign: "right"}}>
            {user.email}
        </div>
    );
};

export default Api;
