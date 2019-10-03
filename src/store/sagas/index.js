import { all } from "redux-saga/effects";
import productsSaga from "./products";
import productSaga from "./product";
import customerSaga from "./user";
import cartSaga from "./cart";

export default function* rootSaga() {
  yield all([productsSaga(), productSaga(), customerSaga(), cartSaga()]);
}
