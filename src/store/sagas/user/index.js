import { all } from "redux-saga/effects";
import {
  signInWatcher,
  signUpWatcher,
  getCustomerWatcher,
  logoutWatcher
} from "./customer.sagas";

export default function* customerSaga() {
  yield all([
    signInWatcher(),
    signUpWatcher(),
    getCustomerWatcher(),
    logoutWatcher()
  ]);
}
