import React, {Component} from 'react';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {cartAction} from '../_actions';
import { bindActionCreators } from 'redux';

class CartPage extends Component {

    changeHandler = (event) => {
        const dispatch = this.props.dispatch;
        const {name, value} = event.target;
        dispatch(cartAction.changeQuantity(name,value));
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
        const cartProducts = this.props.cartProducts;
        const ids = [];
        for(let id in cartProducts) {
            if(Boolean(+id) || id == '0') {
                ids.push(id);
            }
        }
        return <>
        <h1>Cart</h1>
        {
            !cartProducts.totalQty ? <div>No Products in Cart</div> :
            (<>{ids.map(id=><div style={{display: 'grid', gridTemplateColumns: '25vW 25vw 25vw 25vw', alignItems: 'center', justifyItems: 'center'}}>
                <img src={cartProducts[id].images[0].src} style={{width: 50}}/>
                <p>{cartProducts[id].name}</p>
                <p>
                    <button onClick={()=>this.decreament(cartProducts[id].id)}>-</button>
                    <input type='text' name={cartProducts[id].id} onChange={this.changeHandler} value={cartProducts[id].qty}/>
                    <button onClick={()=>this.increament(cartProducts[id].id)}>+</button>
                    <button onClick={()=>this.remove(cartProducts[id].id)}>remove</button>
                </p>
                <p>{cartProducts[id].qty * cartProducts[id].price}</p>
            </div>)}
            <hr/>
            <p>
                Total Products = <span>{cartProducts.totalQty}</span>
            </p>
            <p>
                Total price = <span>{cartProducts.totalPrice}</span>
            </p>
            <Button variant="contained" component={Link} to="/checkout">Checkout</Button>
            </>
            )
        }
        </>
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

const connectedCartPage = connect(mapStateToProps, mapDispatchToProps)(CartPage);

export {connectedCartPage as CartPage};