import React, { Component } from 'react';
import {authenticationAction} from '../_actions';
import {bindActionCreators} from 'redux';
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom';

class LoginPage extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        username: '',
        password: ''
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const dispatch = this.props.dispatch;
        dispatch(authenticationAction.login(this.state.username,this.state.password, this.props.history));
    }

    render() {

        const { username, password } = this.state;

        if (localStorage.getItem('token')) {
            return <Redirect to='/user' />
        }

        return <>
            <form onSubmit={this.handleSubmit}>
                <label>Username: </label>
                <input type="text" name='username' value={username} onChange={this.handleChange} />
                <br />
                <label>Password: </label>
                <input type="password" name='password' value={password} onChange={this.handleChange} />
                <br />
                <button type="submit">Login</button>
            </form>
        </>
    }
}

function mapStateToProps(state) {
    return {
        loginRequest: state.authentication.loginRequest,
        user: state.authentication.user,
        error: state.authentication.error
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch,
        ...bindActionCreators(authenticationAction,dispatch)
    }; 
}

const connectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

export { connectedLoginPage as LoginPage };