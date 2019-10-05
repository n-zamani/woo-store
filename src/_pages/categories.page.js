import React, { Component } from 'react';
import { connect } from "react-redux";
import { categoriesAction } from '../_actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'space-around',
    },
    image: {
        position: 'relative',
        height: 300,
        marginTop: '2rem',
        [theme.breakpoints.down('xs')]: {
            width: '100% !important',
            height: 300,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'black',
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    }
})

class CategoriesPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const dispatch = this.props.dispatch;
        const receivedCategories = this.props.receivedCategories;
        if (!receivedCategories.length) {
            dispatch(categoriesAction.getCategories());
        }
    }

    render() {
        const receivedCategories = this.props.receivedCategories;
        const categoriesRequest = this.props.categoriesRequest;
        const { classes } = this.props;

        return <div dir="rtl" className={classes.root}>
            {
                !categoriesRequest && Object.keys(receivedCategories).length ? receivedCategories.map(category =>
                    category.count ?
                        <>
                            <Link to={"/category/" + category.id + "/" + category.slug}>
                                <ButtonBase
                                    focusRipple
                                    key={category.name}
                                    className={classes.image}
                                    focusVisibleClassName={classes.focusVisible}
                                    style={{
                                        width: 300,
                                    }}
                                >
                                    <span
                                        className={classes.imageSrc}
                                        style={{
                                            backgroundImage: `url(${category.image.src})`,
                                        }}
                                    />
                                    <span className={classes.imageBackdrop} />
                                    <span className={classes.imageButton}>
                                        <Typography
                                            component="span"
                                            variant="subtitle1"
                                            color="inherit"
                                            className={classes.imageTitle}
                                        >
                                            {category.name}
                                            <span className={classes.imageMarked} />
                                        </Typography>
                                    </span>
                                </ButtonBase>
                            </Link>
                        </> : '') : "loading..."
            }
        </div>
    }
}

function mapStateToProps(state) {
    return {
        categoriesRequest: state.categories.categoriesRequest,
        receivedCategories: state.categories.receivedCategories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators(categoriesAction, dispatch)
    };
}

const connectedCategoriesPage = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CategoriesPage));

export { connectedCategoriesPage as CategoriesPage };