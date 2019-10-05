import React, { Component } from 'react';
import { userAction, productAction, authenticationAction } from '../_actions';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import RoomIcon from '@material-ui/icons/Room';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import RTL from '../rtl';
import PinDropIcon from '@material-ui/icons/PinDrop';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const theme = createMuiTheme({
    direction: 'rtl',
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            <Box py={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        height: '100%',
        textAlign: 'right',
        flexDirection: 'row-reverse',
    },
    tabs: {
        backgroundColor: 'white',
        marginTop: '1rem'
    },
    indicator: {
        left: 0
    },
    heading: {
        fontSize: '1rem',
        flexBasis: '24%',
        flexShrink: 0,
    },
    card: {
        width: '60vw',
        margin: '0 1rem',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    container: {
        display: 'grid',
        gridTemplateColumns: '50% 50%',
        flexWrap: 'wrap',
        direction: 'rtl',
    },
    textField: {
        marginLeft: '8px!important',
        marginRight: '8px!important'
    },
    button: {
        marginLeft: '8px!important',
        marginRight: '8px!important',
        marginTop: '16px!important'
    }
});

class UserPage extends Component {

    state = {
        value: 0,
        expanded: false,
        // page: 1,
        openAddressEditor: false,
        address: {
            firstName: '',
            lastName: '',
            address1: '',
            address2: '',
            city: '',
            postcode: '',
            country: '',
            phone: ''
        },
        openUserEditor: false,
        user: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        const email = localStorage.getItem('email');
        const dispatch = this.props.dispatch;
        const user = this.props.user;
        if (!(user && user.id)) {
            dispatch(userAction.getUser(email, this.props.history));
        }
    }

    handleTabChange = (event, value) => {
        this.setState({
            value
        })
    }

    handlePanelChange = panel => (event, isExpanded) => {
        this.setState({
            expanded: isExpanded ? panel : false
        })
    }

    handleEditAddressOpen = () => {
        this.setState({
            openAddressEditor: true
        })
    }

    handleEditAddressClose = () => {
        this.setState({
            openAddressEditor: false
        })
    }

    handleAddressChange = ({ target: { name, value } }) => {
        this.setState({
            address: {
                ...this.state.address,
                [name]: value
            }
        })
    }

    saveAddress = (event) => {
        event.preventDefault();
        const user = this.props.user;
        const dispatch = this.props.dispatch;
        dispatch(userAction.editAddress(this.state.address, user.email, user.id));
        this.setState({
            openAddressEditor: false
        })
    }

    handleEditUserOpen = () => {
        this.setState({
            openUserEditor: true
        })
    }

    handleEditUserClose = () => {
        this.setState({
            openUserEditor: false
        })
    }

    handleUserChange = ({ target: { name, value } }) => {
        this.setState({
            user: {
                ...this.state.user,
                [name]: value
            }
        })
    }

    saveUser = (event) => {
        event.preventDefault();
        const user = this.props.user;
        const dispatch = this.props.dispatch;
        dispatch(userAction.editUser(this.state.user, user.id));
        this.setState({
            openUserEditor: false
        })
    }

    logout = () => {
        const dispatch = this.props.dispatch;
        dispatch(authenticationAction.logout(this.props.history));
        dispatch(userAction.clearInfo());
    }

    render() {
        const dispatch = this.props.dispatch;
        const user = this.props.user;
        const orders = this.props.orders;
        const itemsList = this.props.itemsList;
        const { classes } = this.props;

        if (!localStorage.getItem('email')) {
            return <Redirect to="/login" />;
        }
        return <>
            {
                user && Object.keys(user).length && <div className={classes.root}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleTabChange}
                        orientation="vertical"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="Vertical tabs example"
                        className={classes.tabs}
                        classes={{ indicator: classes.indicator }}
                    >
                        <Tab label="پیشخوان" icon={<PersonPinIcon />} {...a11yProps(0)} />
                        <Tab label="سفارشات" icon={<ShoppingBasket />} {...a11yProps(1)} />
                        <Tab label="آدرس" icon={<RoomIcon />} {...a11yProps(2)} />
                        <Tab label="حساب کاربری" icon={<PermContactCalendarIcon />} {...a11yProps(3)} />
                        <Tab label="خروج" icon={<ExitToAppIcon />} {...a11yProps(4)} />
                    </Tabs>
                    <div dir="rtl" style={{ width: '100%' }}>
                        <TabPanel value={this.state.value} index={0}>
                            <Typography variant="body1" component="p" style={{ margin: '0 1rem' }}>
                                خوش آمدی،
                                <b> {user.first_name} {user.last_name}</b>
                            </Typography>
                        </TabPanel>
                        <TabPanel style={{ padding: 0 }} value={this.state.value} index={1} >
                            {!orders.length ? dispatch(userAction.getOrders(user.id)) : ''}
                            {orders.length && !itemsList.length && dispatch(userAction.listItems(orders.map(order => order.line_items.map(item => item.product_id)).flat(Infinity)))}
                            {orders.length && itemsList.length ? orders.map((order, index) => <>
                                <ExpansionPanel style={{ width: '95%', margin: 'auto' }} expanded={this.state.expanded === `panel${index + 1}`} onChange={this.handlePanelChange(`panel${index + 1}`)}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`panel${index + 1}bh-content`}
                                        id={`panel${index + 1}bh-header`}
                                    >
                                        <Typography noWrap className={classes.heading}>#{order.id}</Typography>
                                        <Typography noWrap className={classes.heading}>{order.date_created.slice(0, 10)}</Typography>
                                        <Typography noWrap className={classes.heading}>{order.total} {order.currency}</Typography>
                                        <Typography noWrap className={classes.heading}>{order.status}</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                            <b>آدرس</b>
                                                <p>{order.billing.first_name} {order.billing.last_name}</p>
                                            <p>{order.billing.address_1}</p>
                                            {order.billing.address_2.length ? <p>{order.billing.address_2}</p> : ''}
                                            <p>{order.billing.postcode}</p>
                                            <p>{order.billing.city}، {order.billing.country}</p>
                                            <p>{order.billing.phone}</p>
                                            <b>وضعیت سفارش</b>
                                                <p>{order.status}</p>
                                            <b>محتویات سفارش</b>
                                                {order.line_items.map(item => itemsList.filter(product => item.product_id === product.id)).flat(Infinity).map(product => <>
                                                <p style={{ width: '80vw', display: 'grid', gridTemplateColumns: '25% 25% 25% 25%', alignItems: 'center', justifyItems: 'center' }}>
                                                    <img src={product.images[0].src} style={{ width: 50 }} />
                                                    <span> {product.name}</span>
                                                    <span> x{order.line_items.find(item => item.product_id === product.id).quantity}</span>
                                                    <span> {order.line_items.find(item => item.product_id === product.id).total} {order.currency}</span>
                                                </p>
                                            </>)}
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </>) : 'loading...'}
                        </TabPanel>
                        <TabPanel value={this.state.value} index={2}>
                            <Card className={classes.card}>
                                <CardContent style={{ padding: '1rem 1rem 0' }}>
                                    {(user.billing.first_name.length &&
                                        user.billing.last_name.length &&
                                        user.billing.address_1.length &&
                                        user.billing.city.length &&
                                        user.billing.postcode.length &&
                                        user.billing.country.length &&
                                        user.billing.phone.length &&
                                        user.billing.email.length) ? <>
                                            <Typography variant="h5" component="h5">
                                                <b>{user.billing.first_name} {user.billing.last_name}</b>
                                            </Typography>
                                            <Typography variant="body1" component="p" style={{ marginTop: '1rem' }}>
                                                {user.billing.address_1}
                                            </Typography>
                                            <Typography variant="body1" component="p" style={{ marginTop: '1rem' }}>
                                                {user.billing.address_2}
                                            </Typography>
                                            <Typography variant="body1" component="p" style={{ marginTop: '1rem' }}>
                                                {user.billing.country}، {user.billing.city}
                                            </Typography>
                                            <Typography variant="body1" component="p" style={{ marginTop: '1rem' }}>
                                                {user.billing.postcode}
                                            </Typography>
                                            <Typography variant="body1" component="p" style={{ marginTop: '1rem' }}>
                                                {user.billing.phone}
                                            </Typography>
                                        </>
                                        : <Typography variant="body2" component="p">آدرس شما ناقص است. لطفا ویرایش کنید.</Typography>}
                                </CardContent>
                                <CardActions style={{ justifyContent: 'flex-end', padding: '1rem' }}>
                                    <Fab color="primary" aria-label="edit" className={classes.fab} onClick={this.handleEditAddressOpen}>
                                        <EditIcon />
                                    </Fab>
                                    <Dialog
                                        open={this.state.openAddressEditor}
                                        onClose={this.handleEditAddressClose}
                                        scroll='paper'
                                        aria-labelledby="scroll-dialog-title"
                                    >
                                        <DialogTitle id="scroll-dialog-title" dir="rtl"><PinDropIcon /> ویرایش آدرس</DialogTitle>
                                        <DialogContent dividers>
                                            <DialogContentText>
                                                <RTL>
                                                    <MuiThemeProvider theme={theme}>
                                                        <form className={classes.container} onSubmit={this.saveAddress} autoComplete="off">
                                                            <TextField
                                                                required
                                                                name="firstName"
                                                                value={this.state.address.firstName}
                                                                label="نام"
                                                                onChange={this.handleAddressChange}
                                                                id="outlined-firstName"
                                                                className={classes.textField}
                                                                margin="normal"
                                                                variant="outlined"
                                                            />
                                                            <TextField
                                                                required
                                                                name="lastName"
                                                                value={this.state.address.lastName}
                                                                label="نام خانوادگی"
                                                                onChange={this.handleAddressChange}
                                                                id="outlined-lastName"
                                                                className={classes.textField}
                                                                margin="normal"
                                                                variant="outlined"
                                                            />
                                                            <TextField
                                                                required
                                                                name="address1"
                                                                value={this.state.address.address1}
                                                                label="آدرس خط 1"
                                                                onChange={this.handleAddressChange}
                                                                id="outlined-address1"
                                                                className={classes.textField}
                                                                margin="normal"
                                                                variant="outlined"
                                                                style={{ gridColumn: '1 / span 2' }}
                                                            />
                                                            <TextField
                                                                name="address2"
                                                                value={this.state.address.address2}
                                                                label="آدرس خط 2"
                                                                onChange={this.handleAddressChange}
                                                                id="outlined-address2"
                                                                className={classes.textField}
                                                                margin="normal"
                                                                variant="outlined"
                                                                style={{ gridColumn: '1 / span 2' }}
                                                            />
                                                            <TextField
                                                                required
                                                                name="city"
                                                                value={this.state.address.city}
                                                                label="شهر"
                                                                onChange={this.handleAddressChange}
                                                                id="outlined-city"
                                                                className={classes.textField}
                                                                margin="normal"
                                                                variant="outlined"
                                                            />
                                                            <TextField
                                                                required
                                                                name="country"
                                                                value={this.state.address.country}
                                                                label="کشور"
                                                                onChange={this.handleAddressChange}
                                                                id="outlined-country"
                                                                className={classes.textField}
                                                                margin="normal"
                                                                variant="outlined"
                                                            />
                                                            <TextField
                                                                required
                                                                name="postcode"
                                                                value={this.state.address.postcode}
                                                                label="کد پستی"
                                                                onChange={this.handleAddressChange}
                                                                id="outlined-postcode"
                                                                className={classes.textField}
                                                                margin="normal"
                                                                variant="outlined"
                                                                dir="ltr"
                                                            />
                                                            <TextField
                                                                required
                                                                name="phone"
                                                                value={this.state.address.phone}
                                                                label="تلفن"
                                                                onChange={this.handleAddressChange}
                                                                id="outlined-phone"
                                                                className={classes.textField}
                                                                margin="normal"
                                                                variant="outlined"
                                                                dir="ltr"
                                                            />
                                                            <TextField
                                                                disabled
                                                                name="email"
                                                                value={user.email}
                                                                label="پست الکترونیکی"
                                                                id="outlined-email"
                                                                className={classes.textField}
                                                                margin="normal"
                                                                variant="outlined"
                                                                style={{ gridColumn: '1 / span 2' }}
                                                                dir="ltr"
                                                            />
                                                            <div style={{ gridColumn: '1 / span 2', direction: 'ltr' }}>
                                                                <Button className={classes.button} onClick={this.handleEditAddressClose} color="primary">
                                                                    لغو
                                                                    </Button>
                                                                <Button className={classes.button} type="submit" variant="contained" color="primary">
                                                                    ذخیره
                                                                    </Button>
                                                            </div>
                                                        </form>
                                                    </MuiThemeProvider>
                                                </RTL>
                                            </DialogContentText>
                                        </DialogContent>
                                    </Dialog>
                                </CardActions>
                            </Card>
                        </TabPanel>
                        <TabPanel value={this.state.value} index={3}>
                            <Card className={classes.card}>
                                <CardContent style={{ display: 'grid', gridTemplateColumns: '50% 50%', flexWrap: 'wrap', padding: '1rem 1rem 0', textOverflow: 'ellipsis' }}>
                                    <Typography variant="body1" component="p">
                                        <b>نام و نام خانوادگی:</b>
                                        <Typography variant="body2" component="p">
                                            {user.first_name} {user.last_name}
                                        </Typography>
                                    </Typography>
                                    <Typography variant="body1" component="p">
                                        <b>نام کاربری:</b>
                                        <Typography variant="body2" component="p">
                                            {user.username}
                                        </Typography>
                                    </Typography>
                                    <Typography variant="body1" component="p" style={{ marginTop: '1rem' }}>
                                        <b>ایمیل:</b>
                                        <Typography variant="body2" component="p" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                            {user.email}
                                        </Typography>
                                    </Typography>
                                    <Typography variant="body1" component="p" style={{ marginTop: '1rem' }}>
                                        <b>تاریخ عضویت:</b>
                                        <Typography variant="body2" component="p">
                                            {user.date_created.slice(0, 10)}
                                        </Typography>
                                    </Typography>
                                </CardContent>
                                <CardActions style={{ justifyContent: 'flex-end', padding: '1rem' }}>
                                    <Fab color="primary" aria-label="edit" className={classes.fab} onClick={this.handleEditUserOpen}>
                                        <EditIcon />
                                    </Fab>
                                    <Dialog
                                        open={this.state.openUserEditor}
                                        onClose={this.handleEditUserClose}
                                        scroll='paper'
                                        aria-labelledby="scroll-dialog-title"
                                    >
                                        <DialogTitle id="scroll-dialog-title" dir="rtl"><AccountCircleIcon /> ویرایش کاربر</DialogTitle>
                                        <DialogContent dividers>
                                            <DialogContentText>
                                                <RTL>
                                                    <MuiThemeProvider theme={theme}>
                                                        <form className={classes.container} onSubmit={this.saveUser} autoComplete="off">
                                                            <TextField
                                                                name="firstName"
                                                                value={this.state.user.firstName}
                                                                label="نام"
                                                                onChange={this.handleUserChange}
                                                                id="outlined-user-firstName"
                                                                className={classes.textField}
                                                                margin="normal"
                                                                variant="outlined"
                                                            />
                                                            <TextField
                                                                name="lastName"
                                                                value={this.state.user.lastName}
                                                                label="نام خانوادگی"
                                                                onChange={this.handleUserChange}
                                                                id="outlined-user-lastName"
                                                                className={classes.textField}
                                                                margin="normal"
                                                                variant="outlined"
                                                            />
                                                            <TextField
                                                                name="email"
                                                                value={this.state.user.email}
                                                                label="پست الکترونیکی"
                                                                onChange={this.handleUserChange}
                                                                id="outlined-user-email"
                                                                className={classes.textField}
                                                                margin="normal"
                                                                variant="outlined"
                                                                style={{ gridColumn: '1 / span 2' }}
                                                                dir="ltr"
                                                            />
                                                            <TextField
                                                                name="password"
                                                                value={this.state.user.password}
                                                                label="رمز عبور"
                                                                onChange={this.handleUserChange}
                                                                id="outlined-password-input"
                                                                type="password"
                                                                className={classes.textField}
                                                                margin="normal"
                                                                variant="outlined"
                                                                style={{ gridColumn: '1 / span 2' }}
                                                                dir="ltr"
                                                            />
                                                            <div style={{ gridColumn: '1 / span 2', direction: 'ltr' }}>
                                                                <Button className={classes.button} onClick={this.handleEditUserClose} color="primary">
                                                                    لغو
                                                                    </Button>
                                                                <Button className={classes.button} type="submit" variant="contained" color="primary">
                                                                    ذخیره
                                                                    </Button>
                                                            </div>
                                                        </form>
                                                    </MuiThemeProvider>
                                                </RTL>
                                            </DialogContentText>
                                        </DialogContent>
                                    </Dialog>
                                </CardActions>
                            </Card>
                        </TabPanel>
                        <TabPanel value={this.state.value} index={4}>
                            <Typography variant="body1" component="p">
                                <b>برای خروج از حساب کاربری بر دکمه زیر کلیک کنید:</b>
                            </Typography>
                            <Button variant="contained" color="secondary" className={classes.button} onClick={this.logout}>
                                خروج
                                </Button>
                        </TabPanel>
                    </div>
                </div> || 'loading...'}
        </>
    }
}

function mapStateToProps(state) {
    return {
        user: state.userInfo.user,
        orders: state.userInfo.orders,
        itemsList: state.userInfo.itemsList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators(userAction, productAction, authenticationAction, dispatch)
    };
}

const connectedUserPage = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UserPage));

export { connectedUserPage as UserPage };