import React from 'react';
import '../styles/todos.css';
import RemoveIcon from '../images/recycle-bin.svg';

export class Todos extends React.Component {


    render() {
        const { todos } = this.props
        if(todos.length === 0){
            return (
                <div>Нет данных</div>
            )
        }
        return (
            <ul>
                {todos.map((todo, index)  => {
                    return (
                        <li><div>{todo}</div><img onClick={(e) => this.props.removeTodos(index)} src={RemoveIcon} alt='Удалить'/></li>
                        )
                })}
            </ul>
        );
    }
}
