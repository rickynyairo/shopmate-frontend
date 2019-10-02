import { combineReducers } from "redux";
import alerts from "./alerts";
import products from "./products";
import product from "./product";
import user from "./user";

const createReducer = asyncReducers =>
  combineReducers({
    alerts,
    products,
    product,
    user,
    ...asyncReducers
  });

export default createReducer;
