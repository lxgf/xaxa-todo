import React from 'react';
import '../styles/main.css';
import {Logo} from './logo'
import {Form} from './form';
import {Todos} from './todos';


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

    reorderTodos = (result) => {
        let newTodos = [...this.state.todos];
        [newTodos[result.destination.index], newTodos[result.source.index]] = [newTodos[result.source.index], newTodos[result.destination.index]];
        this.setState({
            todos: newTodos
        })
    }

    render() {
        const { todos } = this.state
        return (
            <div className="container">
                <Logo />
                <Form addTodos={this.addTodos} />
                <Todos todos={todos} hDrop={this.hDrop} reorderTodos={this.reorderTodos} removeTodos={this.removeTodos} />
            </div>
        );
    }
}
