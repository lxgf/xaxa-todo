import React from 'react';
import '../styles/main.css';
import {Logo} from './logo'
import {Form} from './form';
import {Todos} from './todos';
import firebase from "firebase/compat";
import { doc, onSnapshot } from "firebase/firestore";
import App from "../App";

export class Main extends React.Component {
    state = {
        todos: [],
        loading: true
    }


    loadAllDataFromDb = async () => {
        return this.props.db.collection('todos').doc('all_todos').get().then((doc) => {
            if (doc.exists) {
                const rcvTodos = doc.data().todos;
                this.setState({
                    todos: rcvTodos,
                    loading: false
                })
            } else this.db.collection('todos').doc('all_todos').set({
                todos: ''
            }).then(() => console.log('Документ успешно создан'));
        }).catch((error) => {
            console.log("Ошибка получения документа:", error);
        });
    }

    snapUpdate = () => {
        const upd = this.props.db.collection('todos').doc('all_todos').onSnapshot((doc) => {
            const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            const rcvTodos = doc.data().todos;
            this.setState({
                todos: rcvTodos
            })
        });
    }

    sendToDb = async () => {
        await this.props.db.collection('todos').doc('all_todos').update({
            todos: this.state.todos
        });
    }

    addTodos = async (todoValue) => {
        let newTodos = [...this.state.todos];
        newTodos.push(todoValue);

        await this.setState({
            todos: newTodos
        })

        await this.sendToDb();
    }

    removeTodos = async (index) => {
        let newTodos = [...this.state.todos];
        newTodos.splice(index, 1);

        await this.setState({
            todos: newTodos
        })

        await this.sendToDb();
    }

    reorderTodos = async (result) => {
        if(result.destination !== null) {
            const dstIndex = result.destination.index;
            const srcIndex = result.source.index;

            const [tempTodo] = this.state.todos.splice(srcIndex, 1);
            this.state.todos.splice(dstIndex, 0, tempTodo);

            await this.setState({
                todos: [...this.state.todos]
            })

            await this.sendToDb();
        }
    }


    render() {
        const {todos, loading} = this.state
        return (
            <div className="container">
                <Logo />
                <Form addTodos={this.addTodos} />
                {!loading && <Todos todos={todos} reorderTodos={this.reorderTodos} removeTodos={this.removeTodos} />}
                {loading && <div className="notifier">Загрузка...</div>}
            </div>
        );
    }


    async componentDidMount() {
        await this.loadAllDataFromDb();
        this.snapUpdate();
    }
}
