import React, { useState } from 'react';
import { authenticationAction } from '../_actions';
import {bindActionCreators} from 'redux';
import { connect } from "react-redux";

const RegisterPage = (props) => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        username: ''
    })

    const handleChange = ({ target: { name, value } }) => {
        setValues({
            ...values,
            [name]: value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.dispatch(authenticationAction.register(values.username, values.email, values.password, props.history));
    }

    return <>
        <form onSubmit={handleSubmit}>
            <label>Username: </label>
            <input type="text" name='username' value={values.username} onChange={handleChange} />
            <br />
            <label>E-mail: </label>
            <input type="email" name='email' value={values.email} onChange={handleChange} />
            <br />
            <label>Password: </label>
            <input type="password" name='password' value={values.password} onChange={handleChange} />
            <br />
            <button type="submit">Register</button>
        </form>
    </>
}

function mapDispatchToProps(dispatch){
    return {
        dispatch,
        ...bindActionCreators(authenticationAction,dispatch)
    }; 
}

const connectedRegisterPage = connect(null, mapDispatchToProps)(RegisterPage);

export {connectedRegisterPage as RegisterPage};