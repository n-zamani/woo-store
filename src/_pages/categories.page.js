import React, { Component } from 'react';
import { connect } from "react-redux";
import { categoriesAction } from '../_actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'

class CategoriesPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const dispatch = this.props.dispatch;
        dispatch(categoriesAction.getCategories());
    }

    render() {
        const receivedCategories = this.props.receivedCategories;
        const categoriesRequest = this.props.categoriesRequest;
        return <>
            {
                !categoriesRequest && Object.keys(receivedCategories).length ? receivedCategories.map(category =>
                    category.count ?
                        <>
                            <div style={{ border: '1px solid black' }}>
                                {category.image ? <img src={category.image.src} style={{ width: '300px' }} /> : ''}
                                <br />
                                <Link to={"/category/" + category.id + "/" + category.slug}>{category.name}</Link>
                                <p><span>(</span>{category.count}<span>)</span></p>
                            </div>
                            <br />
                        </> : '') : "loading..."
            }
        </>
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

const connectedCategoriesPage = connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);

export { connectedCategoriesPage as CategoriesPage };