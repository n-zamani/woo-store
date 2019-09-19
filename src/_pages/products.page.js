import React, {Component} from 'react';
import { connect } from "react-redux";
import { productsAction } from '../_actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'

class ProductsPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const dispatch = this.props.dispatch;
        dispatch(productsAction.getProducts(this.props.match.params.categoryId));
    }
    
    render() {
    const receivedProducts = this.props.receivedProducts;
    const productsRequest = this.props.productsRequest;
    return <>
        {
            !productsRequest && receivedProducts.map(product =>
            <>
            <div style={{ border: '1px solid black' }}>
                {product.images[0] ? <img src={product.images[0].src} style={{ width: '300px' }} /> : ''}
                <br/>
                <Link to={"/product/"+product.id+"/"+product.slug}>{product.name}</Link>
                <div dangerouslySetInnerHTML={{__html: product.price_html }} />
            </div>
            <br/>
            </>) || "loading..."
        }
    </>
    }
}

function mapStateToProps(state) {
    return {
        productsRequest: state.products.productsRequest,
        receivedProducts: state.products.receivedProducts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators(productsAction, dispatch)
    };
}

const connectedProductsPage = connect(mapStateToProps, mapDispatchToProps)(ProductsPage);

export { connectedProductsPage as ProductsPage };