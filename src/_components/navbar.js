import React, { useState } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ReorderOutlinedIcon from '@material-ui/icons/ReorderOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row-reverse",
        backgroundColor: "#ff6a5f",
        padding: "20px 0",
        boxShadow: '0px 1px 5px 1px rgba(0,0,0,0.2)',
        zIndex: 10
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
    }
}));

const Navbar = (props) => {
    const classes = useStyles();
    const [horizontal, setHorizontal] = useState('right');
    const [vertical, setVertical] = useState('top');

    localStorage.setItem('cart', JSON.stringify(props.cartProducts));

    return (
        <BottomNavigation
            value={props.location.pathname}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction
                value="/"
                label="خانه"
                icon={<HomeOutlinedIcon />}
                component={Link} to="/"
            />
            <BottomNavigationAction
                value="/categories"
                label="دسته بندی"
                icon={<ReorderOutlinedIcon />}
                component={Link} to="/categories"
            />
            {
                localStorage.getItem('token') ? <BottomNavigationAction
                    value="/user"
                    label="کاربر"
                    icon={<AccountCircleOutlinedIcon />}
                    component={Link} to="/user"
                /> : <BottomNavigationAction
                        value="/login"
                        label="ورود / ثبت نام"
                        icon={<AccountCircleOutlinedIcon />}
                        component={Link} to="/login"
                    />
            }
            <BottomNavigationAction
                value="/cart"
                label="سبد خرید"
                icon={<div className={classes.row}><Badge badgeContent={props.cartProducts.totalQty} color="primary" anchorOrigin={{ horizontal, vertical }}><ShoppingCartOutlinedIcon /></Badge></div>}
                component={Link} to="/cart"
            />
        </BottomNavigation>
    );
}

function mapStateToProps(state) {
    return {
        cartProducts: state.cart.cartProducts,
    };
}

export default withRouter(connect(mapStateToProps)(Navbar));