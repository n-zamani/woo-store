import React, { Component } from 'react';
import { connect } from "react-redux";
import { productAction, cartAction } from '../_actions';
import { bindActionCreators } from 'redux';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import Fab from '@material-ui/core/Fab';

class ProductPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const receivedProducts = this.props.receivedProducts;
        if (!receivedProducts.length) {
            const dispatch = this.props.dispatch;
            dispatch(productAction.getProduct(this.props.match.params.productId));
        }
    }

    addItem = (product) => {
        const dispatch = this.props.dispatch;
        dispatch(cartAction.addToCart(product));
    }

    render() {
        const receivedProduct = this.props.receivedProduct;
        const productRequest = this.props.productRequest;
        const receivedProducts = this.props.receivedProducts;
        const selectedProduct = !receivedProducts.length ? [] : receivedProducts.find(product => product.id == this.props.match.params.productId);
        return <>
            {
                !receivedProducts.length ? (!productRequest && Object.keys(receivedProduct).length ? <div>
                    <img src={receivedProduct.images[0].src} style={{ width: '300px' }} />
                    <p>{receivedProduct.name}</p>
                    <div dangerouslySetInnerHTML={{ __html: receivedProduct.price_html }} />
                    <br />
                    <Fab variant="extended" aria-label="delete" onClick={() => this.addItem(receivedProduct)}>
                        افزودن به سبد خرید
                        <AddShoppingCartOutlinedIcon />
                    </Fab>
                </div> : "loading...") :
                    <div>
                        <img src={selectedProduct.images[0].src} style={{ width: '300px' }} />
                        <p>{selectedProduct.name}</p>
                        <div dangerouslySetInnerHTML={{ __html: selectedProduct.price_html }} />
                        <br />
                        <Fab variant="extended" aria-label="delete" onClick={() => this.addItem(selectedProduct)}>
                            افزودن به سبد خرید
                            <AddShoppingCartOutlinedIcon />
                        </Fab>
                    </div>
            }

        </>
    }
}

function mapStateToProps(state) {
    return {
        productRequest: state.product.productRequest,
        receivedProduct: state.product.receivedProduct,
        receivedProducts: state.products.receivedProducts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators(productAction, cartAction, dispatch)
    };
}

const connectedProductPage = connect(mapStateToProps, mapDispatchToProps)(ProductPage);

export { connectedProductPage as ProductPage };