import React from 'react';
import '../styles/form.css';

export class Form extends React.Component {
    state = {
        formValue: ''
    }

    handleInputChange = (e) => {
        this.setState({
            formValue: e.target.value,
            borderColor: e.target.style.borderColor
        })
    }

    handleInputPress = (e) => {
        if(e.key === 'Enter'){
            let formValue = this.state.formValue,
                strSplit = formValue.split(' '),
                longestWord = 0
            for(let i = 0; i < strSplit.length; i++){
                if(strSplit[i].length > longestWord){
                    longestWord = strSplit[i].length;
                }
            }
            if (/\S/.test(formValue) && (longestWord <= 30)){
                this.props.addTodos(formValue);
                this.setState({
                    formValue: ''
                })
            }
            else {
                let prevBorderColor = this.state.borderColor;
                if (prevBorderColor !== '#FF4D61') {
                    this.setState({
                        borderColor: '#FF4D61'
                    })
                    setTimeout(() => {
                        this.setState({
                            borderColor: prevBorderColor
                        })
                    }, 1000)
                }
            }
        }
    }

    render() {
        return (
            <div>
                <input type="text" aria-label="todo-input" className="form" style={{borderColor: this.state.borderColor}} value={this.state.formValue} onKeyPress={this.handleInputPress} onInput={this.handleInputChange} placeholder="Введите текст для добавления" />
            </div>
        );
    }
}
