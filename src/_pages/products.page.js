import React, { Component } from 'react';
import { connect } from "react-redux";
import { productsAction, cartAction } from '../_actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'center',
    },
    card: {
        position: 'relative',
        margin: '2rem auto',
        width: 300
    }
})

class ProductsPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const dispatch = this.props.dispatch;
        dispatch(productsAction.getProducts(this.props.match.params.categoryId));
    }

    addItem = (product) => {
        const dispatch = this.props.dispatch;
        dispatch(cartAction.addToCart(product));
    }

    render() {
        const receivedProducts = this.props.receivedProducts;
        const productsRequest = this.props.productsRequest;
        const { classes } = this.props;

        return <div dir="rtl" className={classes.root}>
            {
                !productsRequest && receivedProducts.map(product =>
                    <>
                        {product.images[0] ? <>
                            <Card className={classes.card}>
                                <Link to={"/product/" + product.id + "/" + product.slug}>
                                    <CardMedia
                                        component="img"
                                        image={product.images[0].src}
                                        title={product.name}
                                    />
                                </Link>
                                <Button size="medium" color="primary" onClick={() => this.addItem(product)} style={{ position: 'absolute', left: 0, transform: 'translate(0, -100%)' }}>
                                    <AddShoppingCartIcon />
                                </Button>
                                <CardContent>
                                    <Link to={"/product/" + product.id + "/" + product.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Typography gutterBottom variant="body1" component="p" >
                                            <b>{product.name}</b>
                                        </Typography>
                                    </Link>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <div dangerouslySetInnerHTML={{ __html: product.price_html }} />
                                    </Typography>
                                </CardContent>
                            </Card>
                        </> : ''}
                        <br />
                    </>) || "loading..."
            }
        </div>
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
        ...bindActionCreators(productsAction, cartAction, dispatch)
    };
}

const connectedProductsPage = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ProductsPage));

export { connectedProductsPage as ProductsPage };