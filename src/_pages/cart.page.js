import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { cartAction } from '../_actions';
import { bindActionCreators } from 'redux';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    card: {
        margin: '2rem auto',
        width: '90%',
        padding: '1rem'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 50,
    },
    input: {
        textAlign: 'center'
    }
})

class CartPage extends Component {

    changeHandler = (event) => {
        const dispatch = this.props.dispatch;
        const { name, value } = event.target;
        dispatch(cartAction.changeQuantity(name, value));
    }

    increament = (id) => {
        const dispatch = this.props.dispatch;
        dispatch(cartAction.increaseProduct(id));
    }

    decreament = (id) => {
        const dispatch = this.props.dispatch;
        dispatch(cartAction.decreaseProduct(id));
    }

    remove = (id) => {
        const dispatch = this.props.dispatch;
        dispatch(cartAction.removeProduct(id));
    }

    render() {
        const { classes } = this.props;
        const cartProducts = this.props.cartProducts;
        const ids = [];
        for (let id in cartProducts) {
            if (Boolean(+id) || id == '0') {
                ids.push(id);
            }
        }
        return <div dir="rtl">
            <Card className={classes.card}>
                <h1>سبد خرید</h1>
                {
                    !cartProducts.totalQty ? <div>سبد خرید شما خالی است</div> :
                        (<>{ids.map(id => <div style={{ display: 'grid', gridTemplateColumns: '25% 25% 25% 25%', alignItems: 'center', justifyItems: 'center' }}>
                            <Link to={"/product/" + id + "/" + cartProducts[id].slug}><img src={cartProducts[id].images[0].src} style={{ width: 50 }} /></Link>
                            <Link to={"/product/" + id + "/" + cartProducts[id].slug} style={{ textDecoration: 'none', color: 'inherit' }}>{cartProducts[id].name}</Link>
                            <p>
                                <IconButton onClick={() => this.remove(cartProducts[id].id)}><DeleteIcon /></IconButton>
                                <IconButton onClick={() => this.decreament(cartProducts[id].id)}><RemoveIcon /></IconButton>
                                <OutlinedInput
                                    id="component-outlined"
                                    className={classes.textField}
                                    name={cartProducts[id].id}
                                    value={cartProducts[id].qty}
                                    onChange={this.changeHandler}
                                    margin="none"
                                    variant="outlined"
                                    classes={{ input: classes.input }}
                                />
                                <IconButton onClick={() => this.increament(cartProducts[id].id)}><AddIcon /></IconButton>
                            </p>
                            <p>{cartProducts[id].qty * cartProducts[id].price}</p>
                        </div>)}
                            <Divider />
                            <p>
                                تعداد کل محصولات:&nbsp;
                                <span>{cartProducts.totalQty}</span>
                            </p>
                            <p>
                                قیمت کل:&nbsp;
                                <span>{cartProducts.totalPrice}</span>
                            </p>
                            <Button variant="contained" color="primary" component={Link} to="/checkout">ثبت سفارش</Button>
                        </>
                        )
                }
            </Card>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        cartProducts: state.cart.cartProducts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators(cartAction, dispatch)
    };
}

const connectedCartPage = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CartPage));

export { connectedCartPage as CartPage };