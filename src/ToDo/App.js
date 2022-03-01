import React from 'react';
import './styles/main.css';
import {Main} from "./components/main";
import firebase from "firebase/compat";


class App extends React.Component {
    render() {
        return(
            <Main db={this.props.db} />
        );
    }
}

export default App;