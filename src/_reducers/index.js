import { combineReducers } from "redux";
import {authentication} from './authentication.reducer';
import {products} from './products.reducer';
import {product} from './product.reducer';
import {categories} from './categories.reducer';
import {cart} from './cart.reducer';
import { order } from "./order.reducer";
import { userInfo } from "./user.reducer";

const rootReducer = combineReducers({
    authentication,
    products,
    product,
    categories,
    cart,
    order,
    userInfo
});

export default rootReducer;