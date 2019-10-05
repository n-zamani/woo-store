import React, { Component } from 'react';
import { connect } from "react-redux";
import { productAction, cartAction } from '../_actions';
import { bindActionCreators } from 'redux';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = theme => ({
    card: {
        margin: '2rem auto',
        width: '95%',
        display: 'flex',
        justifyContent: 'center'
    },
    margin: {
        marginTop: theme.spacing(2),
    }
})

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
        const { classes } = this.props;
        const receivedProduct = this.props.receivedProduct;
        const productRequest = this.props.productRequest;
        const receivedProducts = this.props.receivedProducts;
        const selectedProduct = !receivedProducts.length ? [] : receivedProducts.find(product => product.id == this.props.match.params.productId);
        return <div dir="rtl">
            {
                !receivedProducts.length ? (!productRequest && Object.keys(receivedProduct).length ?
                    <Card className={classes.card}>
                        <CardMedia
                            component="img"
                            alt={receivedProduct.name}
                            image={receivedProduct.images[0].src}
                            title={receivedProduct.name}
                            style={{ width: 300, margin: '1rem' }}
                        />
                        <CardContent style={{ margin: '1rem' }}>
                            <Typography variant="body1" component="p" >
                                <b>{receivedProduct.name}</b>
                            </Typography>
                            <Typography variant="body2" component="p" >
                                دسته بندی:
                            <span>
                                    {receivedProduct.categories.map(category => <Link to={"/category/" + category.id + "/" + category.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        &nbsp;{category.name}
                                    </Link>)}
                                </span>
                            </Typography>
                            <Typography variant="body2" component="p" style={{ marginTop: '2rem'}}>
                                <div dangerouslySetInnerHTML={{ __html: receivedProduct.description }} />
                            </Typography>
                            <Typography variant="body2" component="p" style={{marginTop: '2rem'}}>
                                <b dangerouslySetInnerHTML={{ __html: receivedProduct.price_html }} />
                            </Typography>
                            <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={() => this.addItem(receivedProduct)}>
                                افزودن به سبد خرید
                                <AddShoppingCartOutlinedIcon />
                            </Button>
                        </CardContent>
                    </Card>
                    : "loading...") :
                    <Card className={classes.card}>
                        <CardMedia
                            component="img"
                            alt={selectedProduct.name}
                            image={selectedProduct.images[0].src}
                            title={selectedProduct.name}
                            style={{ width: 300, margin: '1rem' }}
                        />
                        <CardContent style={{ margin: '1rem' }}>
                            <Typography variant="body1" component="p" >
                                <b>{selectedProduct.name}</b>
                            </Typography>
                            <Typography variant="body2" component="p" >
                                دسته بندی:
                            <span>
                                    {selectedProduct.categories.map(category => <Link to={"/category/" + category.id + "/" + category.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        &nbsp;{category.name}
                                    </Link>)}
                                </span>
                            </Typography>
                            <Typography variant="body2" component="p" style={{ marginTop: '2rem'}}>
                                <div dangerouslySetInnerHTML={{ __html: selectedProduct.description }} />
                            </Typography>
                            <Typography variant="body2" component="p" style={{marginTop: '2rem'}}>
                                <b dangerouslySetInnerHTML={{ __html: selectedProduct.price_html }} />
                            </Typography>
                            <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={() => this.addItem(selectedProduct)}>
                                افزودن به سبد خرید
                                <AddShoppingCartOutlinedIcon />
                            </Button>
                        </CardContent>
                    </Card>
            }

        </div>
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

const connectedProductPage = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ProductPage));

export { connectedProductPage as ProductPage };