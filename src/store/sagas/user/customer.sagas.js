import { put, takeLatest, call } from "redux-saga/effects";
import userService from "../../../services/userService";
import {
  SIGN_IN,
  SIGN_UP,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  GET_CUSTOMER,
  GET_CUSTOMER_FAIL,
  GET_CUSTOMER_SUCCESS,
  SIGN_OUT,
  SIGN_OUT_SUCCESS
} from "../../actions/user";
import { SHOW_TOAST, HIDE_AUTH } from "../../actions/alerts";

function* signInSaga(action) {
  try {
    const data = yield call(userService.signIn, action.payload);

    yield put({
      type: SIGN_IN_SUCCESS,
      payload: data
    });
    yield put({
      type: SHOW_TOAST,
      payload: {
        variant: "success",
        message: `Welcome back ${data.customer.name}`
      }
    });
    yield put({
      type: HIDE_AUTH
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
      type: SIGN_IN_FAIL,
      payload: error
    });
  }
}

function* signUpSaga(action) {
  try {
    const data = yield call(userService.signUp, action.payload);
    yield put({
      type: SIGN_UP_SUCCESS,
      payload: data
    });
    yield put({
      type: SHOW_TOAST,
      payload: {
        variant: "success",
        message: "Signed up successfully!"
      }
    });
    yield put({
      type: HIDE_AUTH
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
      type: SIGN_UP_FAIL,
      payload: error
    });
  }
}
function* getCustomerSaga() {
  try {
    const data = yield call(userService.getCustomer);
    yield put({
      type: GET_CUSTOMER_SUCCESS,
      payload: data
    });
    // yield put({
    //   type: SHOW_TOAST,
    //   payload: {
    //     variant: "success",
    //     message: `Welcome back ${data.name} !`
    //   }
    // });
  } catch (error) {
    yield put({
      type: GET_CUSTOMER_FAIL,
      payload: error
    });
  }
}

export function* signOutSaga() {
  yield call(userService.signOut);
  yield put({
    type: SIGN_OUT_SUCCESS
  });
}
export function* signInWatcher() {
  yield takeLatest(SIGN_IN, signInSaga);
}
export function* signUpWatcher() {
  yield takeLatest(SIGN_UP, signUpSaga);
}
export function* getCustomerWatcher() {
  yield takeLatest(GET_CUSTOMER, getCustomerSaga);
}
export function* logoutWatcher() {
  yield takeLatest(SIGN_OUT, signOutSaga);
}
