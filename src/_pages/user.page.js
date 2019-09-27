import React, { Component } from 'react';
import { authenticationAction } from '../_actions';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom';

class UserPage extends Component {

    componentDidMount() {
        const email = localStorage.getItem('email');
        const dispatch = this.props.dispatch;
        dispatch(authenticationAction.getUser(email));
    }

    render() {
        const dispatch = this.props.dispatch;
        const user = this.props.user;
        if (!localStorage.getItem('email')) {
            return <Redirect to="/login"/>;
        }
        return <>
            {
                user && Object.keys(user).length && <>
                    <p>
                        Welcome
                        <span>{` ${user.first_name} ${user.last_name}`}</span>
                    </p>
                    <button onClick={() => dispatch(authenticationAction.logout(this.props.history))}>logout</button>
                </> || 'loading...'
            }
        </>
    }
}

function mapStateToProps(state) {
    return {
        user: state.authentication.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators(authenticationAction, dispatch)
    };
}

const connectedUserPage = connect(mapStateToProps, mapDispatchToProps)(UserPage);

export { connectedUserPage as UserPage };