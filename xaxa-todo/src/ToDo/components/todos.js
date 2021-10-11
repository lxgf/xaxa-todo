import React from 'react';
import '../styles/todos.css';
import RemoveIcon from '../images/recycle-bin.svg';
import {DragDropContext}  from "react-beautiful-dnd";
import {Droppable} from "react-beautiful-dnd";
import {Draggable} from "react-beautiful-dnd";


export class Todos extends React.Component {

    state = {
        todos: []
    }

    onDragEnd = result => {
        this.props.reorderTodos(result);
    }

    render() {
        const { todos } = this.props
        if(todos.length === 0){
            return (
                <div className="notifier">Нет данных!</div>
            )
        }

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="list" >
                    {provided => (
                        <ul {...provided.droppableProps} ref={provided.innerRef}>
                            {todos.map((todo, index)  => {
                                return (
                                    <Draggable key={index} draggableId={'todo-'+index} index={index}>
                                        {provided => (
                                            <li
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                            ><div>{todo}</div><img onClick={(e) => this.props.removeTodos(index)} src={RemoveIcon} alt='Удалить'/></li>
                                        )}
                                    </Draggable>
                                )
                            })}
                        {provided.placeholder}
                        </ul>
                    )
                    }
                </Droppable>
            </DragDropContext>
        );
    }
}
