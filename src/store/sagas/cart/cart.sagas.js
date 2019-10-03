import { put, takeLatest, takeEvery, call } from "redux-saga/effects";
import cartService from "../../../services/cartService";
import {
  ADD_TO_CART,
  ADD_TO_CART_FAIL,
  ADD_TO_CART_SUCCESS,
  EMPTY_CART_SUCCESS,
  EMPTY_CART_FAIL,
  EMPTY_CART,
  UPDATE_QUANTITY,
  GET_CART_ID,
  GET_CART_ID_FAIL,
  GET_CART_ID_SUCCESS,
  GET_ITEMS_IN_CART_SUCCESS,
  GET_ITEMS_IN_CART_FAIL,
  GET_ITEMS_IN_CART,
  UPDATE_QUANTITY_SUCCESS,
  UPDATE_QUANTITY_FAIL
} from "../../actions/cart";
import { SHOW_TOAST, SHOW_CART, HIDE_CART } from "../../actions/alerts";

function* getCartIdSaga() {
  try {
    const { cart_id } = yield call(cartService.getCartId);
    yield put({
      type: GET_CART_ID_SUCCESS,
      payload: cart_id
    });
    yield put({
      type: GET_ITEMS_IN_CART,
      payload: cart_id
    });
  } catch (error) {
    yield put({
      type: SHOW_TOAST,
      payload: {
        variant: "error",
        message: error.error.message
      }
    });
    yield put({
      type: GET_CART_ID_FAIL,
      payload: error
    });
  }
}
function* addToCartSaga(action) {
  try {
    const items = yield call(cartService.addToCart, action.payload);
    yield put({
      type: ADD_TO_CART_SUCCESS,
      payload: items
    });
    yield put({
      type: SHOW_TOAST,
      payload: {
        variant: "success",
        message: `${items[items.length - 1].name} has been added to cart`
      }
    });
    yield put({
      type: SHOW_CART
    });
  } catch (error) {
    yield put({
      type: SHOW_TOAST,
      payload: {
        variant: "error",
        message: "Failed to add to cart"
      }
    });
    yield put({
      type: ADD_TO_CART_FAIL,
      payload: error
    });
  }
}

function* emptyCartSaga(action) {
  try {
    yield call(cartService.emptyCart, action.payload);
    yield put({
      type: EMPTY_CART_SUCCESS
    });
    yield put({
      type: SHOW_TOAST,
      payload: {
        variant: "success",
        message: `All items removed from the cart succesfully`
      }
    });
    yield put({
      type: HIDE_CART
    });
  } catch (error) {
    yield put({
      type: SHOW_TOAST,
      payload: {
        variant: "error",
        message: error.error.message
      }
    });
    yield put({
      type: EMPTY_CART_FAIL,
      payload: error
    });
  }
}

function* getItemsInCartSaga(action) {
  try {
    const items = yield call(cartService.getItemsInCart, action.payload);
    if (items.length < 1) {
      const errorObject = {
        error: { message: "The cart is empty" }
      };
      throw errorObject;
    }
    yield put({
      type: GET_ITEMS_IN_CART_SUCCESS,
      payload: items
    });
  } catch (error) {
    yield put({
      type: GET_ITEMS_IN_CART_FAIL,
      payload: error
    });
  }
}

function* updateQuantitySaga(action) {
  try {
    const { item, quantity } = action.payload;
    const updatedItem = yield call(cartService.updateCartItemQuantity, {
      item_id: item.item_id,
      quantity
    });

    yield put({
      type: UPDATE_QUANTITY_SUCCESS,
      payload: updatedItem
    });
    // yield put({
    //   type: GET_ITEMS_IN_CART
    // });
  } catch (error) {
    yield put({
      type: UPDATE_QUANTITY_FAIL,
      payload: error
    });
  }
}
export function* addToCartWatcher() {
  yield takeEvery(ADD_TO_CART, addToCartSaga);
}
export function* emptyCartWatcher() {
  yield takeLatest(EMPTY_CART, emptyCartSaga);
}
export function* updateItemQuantityWatcher() {
  yield takeEvery(UPDATE_QUANTITY, updateQuantitySaga);
}
export function* getCartIdWatcher() {
  yield takeLatest(GET_CART_ID, getCartIdSaga);
}
export function* getItemsInCartWatcher() {
  yield takeLatest(GET_ITEMS_IN_CART, getItemsInCartSaga);
}
