import React from 'react';
import '../styles/form.css';

export class Form extends React.Component {
    handlePress = (e) => {
        if(e.key === 'Enter'){
            let formValue = document.querySelector('.form').value;
            this.props.addTodos(formValue);
        }
    }

    render() {
        return (
            <div>
                <input type="text" className="form" onKeyPress={this.handlePress} placeholder="Введите текст для добавления" />
            </div>
        );
    }
}
