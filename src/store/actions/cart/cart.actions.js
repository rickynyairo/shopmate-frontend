export const ADD_TO_CART = "ADD_TO_CART";
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const ADD_TO_CART_FAIL = "ADD_TO_CART_FAIL";
export const GET_CART_ID = "GET_CART_ID";
export const GET_CART_ID_SUCCESS = "GET_CART_ID_SUCCESS";
export const GET_CART_ID_FAIL = "GET_CART_ID_FAIL";
export const EMPTY_CART = "EMPTY_CART";
export const EMPTY_CART_SUCCESS = "EMPTY_CART_SUCCESS";
export const EMPTY_CART_FAIL = "EMPTY_CART_FAIL";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";
export const UPDATE_QUANTITY_FAIL = "UPDATE_QUANTITY_FAIL";
export const UPDATE_QUANTITY_SUCCESS = "UPDATE_QUANTITY_SUCCESS";
export const GET_ITEMS_IN_CART = "GET_ITEMS_IN_CART";
export const GET_ITEMS_IN_CART_SUCCESS = "GET_ITEMS_IN_CART_SUCCESS";
export const GET_ITEMS_IN_CART_FAIL = "GET_ITEMS_IN_CART_FAIL";

export function getCartId() {
  return {
    type: GET_CART_ID
  };
}

export function addToCart(item) {
  return {
    type: ADD_TO_CART,
    payload: item
  };
}

export function emptyCart(cart_id) {
  return {
    type: EMPTY_CART,
    payload: cart_id
  };
}

export function updateQuantity(item, quantity) {
  return {
    type: UPDATE_QUANTITY,
    payload: { item, quantity }
  };
}

export function getItemsInCart(cart_id) {
  return {
    type: GET_ITEMS_IN_CART,
    payload: cart_id
  };
}
