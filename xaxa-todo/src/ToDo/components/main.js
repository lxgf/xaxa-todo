import React, {useContext, useState} from 'react';
import '../styles/main.css';
import {Header} from './header'
import {Form} from './form';
import {Todos} from './todos';
import Api from './api'
import firebase from "firebase/compat";
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";

const db = firebase.firestore();

const {auth} = useContext(Context);
const [user] = useAuthState(auth);

export class Main extends React.Component {
    state = {
        todos: []
    }

    addTodos = (todoValue) => {
        let newTodos = [...this.state.todos];
        newTodos.push(todoValue);

        this.setState({
            todos: newTodos
        })
    }

    removeTodos = (index) => {
        let newTodos = [...this.state.todos];
        newTodos.splice(index, 1);

        this.setState({
            todos: newTodos
        })
    }

    reorderTodos = async (result) => {
        if(result.destination !== null) {
            const dstIndex = result.destination.index;
            const srcIndex = result.source.index;

            const [tempTodo] = this.state.todos.splice(srcIndex, 1);
            this.state.todos.splice(dstIndex, 0, tempTodo);

            this.setState({
                todos: [...this.state.todos]
            })
        }
    }


    getTodos = (receivedTodos) => {
        this.setState({
            todos: receivedTodos
        })
    }

    render() {
        const {todos} = this.state
        return (
            <div className="container">
                <Api todos={todos} sendTodos={todos} getTodos={this.getTodos} />
                <Header />
                <Form addTodos={this.addTodos} />
                <Todos todos={todos} reorderTodos={this.reorderTodos} removeTodos={this.removeTodos} />
            </div>
        );
    }
}
