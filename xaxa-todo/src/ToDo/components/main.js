import React from 'react';
import '../styles/main.css';
import {Logo} from './logo'
import {Form} from './form';
import {Todos} from './todos';
import firebase from "firebase/compat";
import { doc, onSnapshot } from "firebase/firestore";

export class Main extends React.Component {
    state = {
        todos: []
    }

    db = firebase.firestore();
    docRef = this.db.collection('todos').doc('all_todos');

    loadAllDataFromDb = () => {
        this.docRef.get().then(async (doc) => {
            if (doc.exists) {
                const rcvTodos = doc.data().todos;
                await this.setState({
                    todos: rcvTodos
                })
            } else this.docRef.set({
                todos: ''
            }).then(() => console.log('Документ успешно создан'));
        }).catch((error) => {
            console.log("Ошибка получения документа:", error);
        });
    }

    snapUpdate = () => {
        const upd = onSnapshot(doc(this.db, "todos", "all_todos"), async(doc) => {
            const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            const rcvTodos = doc.data().todos;
            await this.setState({
                todos: rcvTodos
            })
        });
    }

    sendToDb = async () => {
        await this.docRef.update({
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
        const {todos} = this.state
        return (
            <div className="container">
                <Logo />
                <Form addTodos={this.addTodos} />
                <Todos todos={todos} reorderTodos={this.reorderTodos} removeTodos={this.removeTodos} />
            </div>
        );
    }


    componentDidMount() {
        this.loadAllDataFromDb();
        this.snapUpdate();
    }
}
