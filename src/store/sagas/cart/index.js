import { all } from "redux-saga/effects";
import {
  addToCartWatcher,
  emptyCartWatcher,
  updateItemQuantityWatcher,
  getCartIdWatcher,
  getItemsInCartWatcher
} from "./cart.sagas";

export default function* customerSaga() {
  yield all([
    addToCartWatcher(),
    emptyCartWatcher(),
    updateItemQuantityWatcher(),
    getCartIdWatcher(),
    getItemsInCartWatcher()
  ]);
}
