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

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
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
    }
}));


const CheckoutPage = (props) => {
    
    const dispatch = props.dispatch;
    const shipMethods = props.shipMethods;
    const payMethods = props.payMethods;
    
    const [billingAddress, setBillingAddress] = useState({
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        postcode: '',
        country: '',
        phone: '',
        email: ''
    })
    
    const [shippingAddress, setShippingAddress] = useState({
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        postcode: '',
        country: ''
    })
    
    const [shippingMethod, setShippingMethod] = useState({
        method: '',
        price: '0'
    });
    
    const [paymentMethod, setPaymentMethod] = useState('');
    
    const handleBillingAddressChange = ({ target: { name, value } }) => {
        setBillingAddress({
            ...billingAddress,
            [name]: value
        });
    }
    
    const handleShippingAddressChange = ({ target: { name, value } }) => {
        setShippingAddress({
            ...shippingAddress,
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
                return <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'right' }}>
                    <div>
                        <h2>آدرس صورتحساب</h2>
                        <form>
                            <label>
                                :نام
                            <br />
                                <input type='text' name='firstName' value={billingAddress.firstName} onChange={handleBillingAddressChange} />
                            </label>
                            <br />
                            <label>
                                :نام خانوادگی
                            <br />
                                <input type='text' name='lastName' value={billingAddress.lastName} onChange={handleBillingAddressChange} />
                            </label>
                            <br />
                            <label>
                                :آدرس 1
                            <br />
                                <input type='text' name='address1' value={billingAddress.address1} onChange={handleBillingAddressChange} />
                            </label>
                            <br />
                            <label>
                                :آدرس 2
                            <br />
                                <input type='text' name='address2' value={billingAddress.address2} onChange={handleBillingAddressChange} />
                            </label>
                            <br />
                            <label>
                                :شهر
                            <br />
                                <input type='text' name='city' value={billingAddress.city} onChange={handleBillingAddressChange} />
                            </label>
                            <br />
                            <label>
                                :کد پستی
                            <br />
                                <input type='text' name='postcode' value={billingAddress.postcode} onChange={handleBillingAddressChange} />
                            </label>
                            <br />
                            <label>
                                :کشور
                            <br />
                                <input type='text' name='country' value={billingAddress.country} onChange={handleBillingAddressChange} />
                            </label>
                            <br />
                            <label>
                                :تلفن
                            <br />
                                <input type='text' name='phone' value={billingAddress.phone} onChange={handleBillingAddressChange} />
                            </label>
                            <br />
                            <label>
                                :ایمیل
                            <br />
                                <input type='text' name='email' value={billingAddress.email} onChange={handleBillingAddressChange} />
                            </label>
                            <br />
                        </form>
                    </div>
                    <div>
                        <h2>آدرس ارسال</h2>
                        <form>
                            <label>
                                :نام
                            <br />
                                <input type='text' name='firstName' value={shippingAddress.firstName} onChange={handleShippingAddressChange} />
                            </label>
                            <br />
                            <label>
                                :نام خانوادگی
                            <br />
                                <input type='text' name='lastName' value={shippingAddress.lastName} onChange={handleShippingAddressChange} />
                            </label>
                            <br />
                            <label>
                                :آدرس 1
                            <br />
                                <input type='text' name='address1' value={shippingAddress.address1} onChange={handleShippingAddressChange} />
                            </label>
                            <br />
                            <label>
                                :آدرس 2
                            <br />
                                <input type='text' name='address2' value={shippingAddress.address2} onChange={handleShippingAddressChange} />
                            </label>
                            <br />
                            <label>
                                :شهر
                            <br />
                                <input type='text' name='city' value={shippingAddress.city} onChange={handleShippingAddressChange} />
                            </label>
                            <br />
                            <label>
                                :کد پستی
                            <br />
                                <input type='text' name='postcode' value={shippingAddress.postcode} onChange={handleShippingAddressChange} />
                            </label>
                            <br />
                            <label>
                                :کشور
                            <br />
                                <input type='text' name='country' value={shippingAddress.country} onChange={handleShippingAddressChange} />
                            </label>
                        </form>
                    </div>
                </div>
            case 1:
                return <FormControl component="fieldset">
                    <RadioGroup aria-label="shipping" name="shipping" value={shippingMethod.method} onChange={handleShipmentChange}>
                        {shipMethods ? shipMethods.map(method => method.enabled && <>
                            <FormControlLabel
                                value={method.method_id}
                                control={<Radio color="primary" />}
                                label={method.title}
                                labelPlacement="start"
                                />
                            <span>{method.settings.cost && `تومان ${method.settings.cost.value}`}</span>
                        </>) : 'loading...'}
                    </RadioGroup>
                </FormControl >

case 2:
    return <FormControl component="fieldset" className={classes.formControl}>
                    <RadioGroup aria-label="payment" name="payment" value={paymentMethod} onChange={handlePaymentChange}>
                        {payMethods ? payMethods.map(method => method.enabled && <FormControlLabel
                            value={method.id}
                            control={<Radio color="primary" />}
                            label={`${method.title} (${method.description})`}
                            labelPlacement="start"
                            />) : 'loading...'}
                    </RadioGroup>
                </FormControl >
        }
    }
    
    const classes = useStyles();
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
            dispatch(orderAction.createOrder(billingAddress,shippingAddress,shippingMethod,paymentMethod));
            dispatch(cartAction.emptyCart());
        }
    })

    return <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
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