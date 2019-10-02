export const SIGN_UP = "SIGN_UP";
export const SIGN_IN = "SIGN_IN";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_UP_FAIL = "SIGN_UP_FAIL";
export const SIGN_IN_FAIL = "SIGN_IN_FAIL";
export const GET_CUSTOMER = "GET_CUSTOMER";
export const GET_CUSTOMER_SUCCESS = "GET_CUSTOMER_SUCCESS";
export const GET_CUSTOMER_FAIL = "GET_CUSTOMER_FAIL";
export const SIGN_OUT = "SIGN_OUT";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";

export function signIn(user) {
  return {
    type: SIGN_IN,
    payload: user
  };
}

export function signUp(user) {
  return {
    type: SIGN_UP,
    payload: user
  };
}

export function signOut() {
  return {
    type: SIGN_OUT
  };
}

export function getCustomer() {
  return {
    type: GET_CUSTOMER
  };
}
