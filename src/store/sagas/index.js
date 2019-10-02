import { all } from "redux-saga/effects";
import productsSaga from "./products";
import productSaga from "./product";
import customerSaga from "./user";

export default function* rootSaga() {
  yield all([productsSaga(), productSaga(), customerSaga()]);
}
