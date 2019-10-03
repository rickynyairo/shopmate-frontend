import { combineReducers } from "redux";
import alerts from "./alerts";
import products from "./products";
import product from "./product";
import user from "./user";
import cart from "./cart";

const createReducer = asyncReducers =>
  combineReducers({
    alerts,
    products,
    product,
    user,
    cart,
    ...asyncReducers
  });

export default createReducer;
