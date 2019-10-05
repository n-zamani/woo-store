import React, { useState } from 'react';
import { authenticationAction } from '../_actions';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Redirect, Link } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import RTL from '../rtl';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
    direction: 'rtl',
});

const useStyles = makeStyles(theme => ({
    root: {
        direction: 'rtl',
        margin: '2rem auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%'
    },
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    textField: {
        marginLeft: '8px!important',
        marginRight: '8px!important'
    },
    margin: {
        margin: '8px!important'
    },
}));

const RegisterPage = (props) => {

    const classes = useStyles();

    const [values, setValues] = useState({
        email: '',
        password: '',
        username: '',
        firstName: '',
        LastName: ''
    })

    const handleChange = ({ target: { name, value } }) => {
        setValues({
            ...values,
            [name]: value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.dispatch(authenticationAction.register(values.username, values.firstName, values.LastName, values.email, values.password, props.history));
    }

    if (localStorage.getItem('token')) {
        return <Redirect to='/user' />
    }

    return <div className={classes.root}>
        <RTL>
            <MuiThemeProvider theme={theme}>
                <Card>
                    <CardContent >
                        <h5>ثبت نام</h5>
                        <form className={classes.container} onSubmit={handleSubmit}>
                            <TextField
                                required
                                name="username"
                                value={values.username}
                                label="نام کاربری"
                                onChange={handleChange}
                                id="outlined-username"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                dir="ltr"
                            />
                            <TextField
                                required
                                name="firstName"
                                value={values.firstName}
                                label="نام"
                                onChange={handleChange}
                                id="outlined-firstName"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                required
                                name="LastName"
                                value={values.LastName}
                                label="نام خانوادگی"
                                onChange={handleChange}
                                id="outlined-LastName"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                required
                                name="email"
                                value={values.email}
                                label="پست الکترونیکی"
                                onChange={handleChange}
                                id="outlined-email"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                dir="ltr"
                            />
                            <TextField
                                required
                                type="password"
                                name="password"
                                value={values.password}
                                label="رمز عبور"
                                onChange={handleChange}
                                id="outlined-password"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                dir="ltr"
                            />
                            <div style={{ direction: 'ltr' }}>
                                <Button type="submit" variant="contained" size="medium" color="primary" className={classes.margin}>
                                    ثبت نام
                                </Button>
                                <Button variant="contained" size="medium" color="default" component={Link} to="/login" className={classes.margin}>
                                    ورود
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </MuiThemeProvider>
        </RTL>
    </div>
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators(authenticationAction, dispatch)
    };
}

const connectedRegisterPage = connect(null, mapDispatchToProps)(RegisterPage);

export { connectedRegisterPage as RegisterPage };