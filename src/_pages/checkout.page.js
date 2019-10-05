import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { orderAction, cartAction } from "../_actions";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import RTL from '../rtl';
import TextField from '@material-ui/core/TextField';

const theme = createMuiTheme({
    direction: 'rtl',
});

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
        direction: 'rtl',
        margin: '2rem auto'
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(3),
        textAlign: 'right'
    },
    container: {
        display: 'grid',
        gridTemplateColumns: '50% 50%',
        flexWrap: 'wrap',
        direction: 'rtl',
        width: '50%'
    },
    textField: {
        marginLeft: '8px!important',
        marginRight: '8px!important'
    },
}));

const CheckoutPage = (props) => {

    const classes = useStyles();

    const dispatch = props.dispatch;
    const shipMethods = props.shipMethods;
    const payMethods = props.payMethods;

    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        postcode: '',
        country: '',
        phone: '',
        email: ''
    });

    const [shippingMethod, setShippingMethod] = useState({
        method: '',
        price: '0'
    });

    const [paymentMethod, setPaymentMethod] = useState('');

    const handleAddressChange = ({ target: { name, value } }) => {
        setAddress({
            ...address,
            [name]: value
        });
    }

    const handleShipmentChange = ({ target: { value } }) => {

        const findItem = shipMethods.findIndex(item => value == item.method_id);
        const price = shipMethods[findItem].settings.cost && shipMethods[findItem].settings.cost.value || '0'

        setShippingMethod({
            method: value,
            price: price
        });
    }

    const handlePaymentChange = ({ target: { value } }) => {
        setPaymentMethod(value);
    }

    function getSteps() {
        return ['آدرس', 'روش ارسال', 'روش پرداخت'];
    }

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <div>
                    <RTL>
                        <MuiThemeProvider theme={theme}>
                            <h2>آدرس</h2>
                            <form className={classes.container}>
                                <TextField
                                    required
                                    name="firstName"
                                    value={address.firstName}
                                    label="نام"
                                    onChange={handleAddressChange}
                                    id="outlined-firstName"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    required
                                    name="lastName"
                                    value={address.lastName}
                                    label="نام خانوادگی"
                                    onChange={handleAddressChange}
                                    id="outlined-lastName"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    required
                                    name="address1"
                                    value={address.address1}
                                    label="آدرس خط 1"
                                    onChange={handleAddressChange}
                                    id="outlined-address1"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    style={{ gridColumn: '1 / span 2' }}
                                />
                                <TextField
                                    name="address2"
                                    value={address.address2}
                                    label="آدرس خط 2"
                                    onChange={handleAddressChange}
                                    id="outlined-address2"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    style={{ gridColumn: '1 / span 2' }}
                                />
                                <TextField
                                    required
                                    name="city"
                                    value={address.city}
                                    label="شهر"
                                    onChange={handleAddressChange}
                                    id="outlined-city"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    required
                                    name="country"
                                    value={address.country}
                                    label="کشور"
                                    onChange={handleAddressChange}
                                    id="outlined-country"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    required
                                    name="postcode"
                                    value={address.postcode}
                                    label="کد پستی"
                                    onChange={handleAddressChange}
                                    id="outlined-postcode"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    dir="ltr"
                                />
                                <TextField
                                    required
                                    name="phone"
                                    value={address.phone}
                                    label="تلفن"
                                    onChange={handleAddressChange}
                                    id="outlined-phone"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    dir="ltr"
                                />
                                <TextField
                                    required
                                    name="email"
                                    value={address.email}
                                    label="پست الکترونیکی"
                                    onChange={handleAddressChange}
                                    id="outlined-email"
                                    className={classes.textField}
                                    margin="normal"
                                    variant="outlined"
                                    style={{ gridColumn: '1 / span 2' }}
                                    dir="ltr"
                                />
                            </form>
                        </MuiThemeProvider>
                    </RTL>
                </div>
            case 1:
                return <div style={{ textAlign: 'right' }}>
                    <h2>روش ارسال</h2>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="shipping" name="shipping" value={shippingMethod.method} onChange={handleShipmentChange}>
                            {shipMethods ? shipMethods.map(method => method.enabled && <div>
                                <FormControlLabel
                                    value={method.method_id}
                                    control={<Radio color="primary" />}
                                    label={`${method.title} ${method.settings.cost ? `(${method.settings.cost.value} تومان)` : ''}`}
                                    labelPlacement="end"
                                />
                            </div>) : 'loading...'}
                        </RadioGroup>
                    </FormControl >
                </div>
            case 2:
                return <div style={{ textAlign: 'right' }}>
                    <h2>روش پرداخت</h2>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <RadioGroup aria-label="payment" name="payment" value={paymentMethod} onChange={handlePaymentChange}>
                            {payMethods ? payMethods.map(method => method.enabled && <FormControlLabel
                                value={method.id}
                                control={<Radio color="primary" />}
                                label={`${method.title} (${method.description})`}
                                labelPlacement="end"
                            />) : 'loading...'}
                        </RadioGroup>
                    </FormControl >
                </div>
        }
    }

    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    function handleNext() {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    useEffect(() => {
        if (!shipMethods && !payMethods) {
            dispatch(orderAction.shippingMethods());
            dispatch(orderAction.paymentMethods());
        }

        if (activeStep == 3) {
            dispatch(orderAction.createOrder(address, shippingMethod, paymentMethod));
            dispatch(cartAction.emptyCart());
        }
    })

    return <div className={classes.root}>
        <Stepper activeStep={activeStep}>
            {steps.map(label => (
                <Step key={label}>
                    <StepLabel />
                </Step>
            ))}
        </Stepper>
        <div>
            {activeStep === steps.length ? (
                <div>
                    <Typography className={classes.instructions}>سفارش ثبت شد</Typography>
                </div>
            ) : (
                    <div>
                        {getStepContent(activeStep)}
                        <br />
                        <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                مرحله قبل
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'پایان' : 'مرحله بعد'}
                            </Button>
                        </div>
                    </div>
                )}
        </div>
    </div>
}

function mapStateToProps(state) {
    return {
        shipMethods: state.order.shipMethods,
        payMethods: state.order.payMethods
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators(orderAction, cartAction, dispatch)
    };
}

const connectedCheckoutPage = connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);

export { connectedCheckoutPage as CheckoutPage };