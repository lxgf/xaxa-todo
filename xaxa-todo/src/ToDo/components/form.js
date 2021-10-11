import React from 'react';
import '../styles/form.css';

export class Form extends React.Component {
    state = {
        formValue: ''
    }

    handleInputChange = (e) => {
        this.setState({
            formValue: e.target.value
        })
    }

    handleInputPress = (e) => {
        if(e.key === 'Enter'){
            let formValue = this.state.formValue;
            if (/\S/.test(formValue)) {
                this.props.addTodos(formValue);
                this.setState({
                    formValue: ''
                })
            }
        }
    }

    render() {
        return (
            <div>
                <input type="text" className="form" value={this.state.formValue} onKeyPress={this.handleInputPress} onInput={this.handleInputChange} placeholder="Введите текст для добавления" />
            </div>
        );
    }
}
