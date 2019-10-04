import { put, takeLatest, takeEvery, call } from "redux-saga/effects";
import filterService from "../../../services/filterService";
import {
  GET_ALL_CATEGORIES,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAIL,
  GET_SINGLE_CATEGORY_FAIL,
  GET_PRODUCT_CATEGORY_FAIL,
  GET_DEPARTMENT_CATEGORIES_SUCCESS,
  GET_SINGLE_CATEGORY,
  GET_DEPARTMENT_CATEGORIES,
  GET_PRODUCT_CATEGORY,
  GET_SINGLE_CATEGORY_SUCCESS,
  GET_PRODUCT_CATEGORY_SUCCESS,
  GET_DEPARTMENT_CATEGORIES_FAIL,
  GET_ALL_DEPARTMENTS_FAIL,
  GET_ALL_DEPARTMENTS,
  GET_SINGLE_DEPARTMENT_FAIL,
  GET_SINGLE_DEPARTMENT_SUCCESS,
  GET_SINGLE_DEPARTMENT,
  GET_ALL_DEPARTMENTS_SUCCESS
} from "../../actions/products";

function* getCategoriesSaga() {
  try {
    const data = yield call(filterService.getAllCategories);
    yield put({
      type: GET_ALL_CATEGORIES_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: GET_ALL_CATEGORIES_FAIL,
      payload: error
    });
  }
}
function* getSingleCategorySaga(action) {
  try {
    const item = yield call(filterService.getSingleCategory, action.payload);
    yield put({
      type: GET_SINGLE_CATEGORY_SUCCESS,
      payload: item
    });
  } catch (error) {
    yield put({
      type: GET_SINGLE_CATEGORY_FAIL,
      payload: error
    });
  }
}

function* getProductCategorySaga(action) {
  try {
    const item = yield call(filterService.getProductCategory, action.payload);
    yield put({
      type: GET_PRODUCT_CATEGORY_SUCCESS,
      payload: item
    });
  } catch (error) {
    yield put({
      type: GET_PRODUCT_CATEGORY_FAIL,
      payload: error
    });
  }
}

function* getDepartmentCategoriesSaga(action) {
  try {
    const items = yield call(
      filterService.getCategoriesInDepartment,
      action.payload
    );
    yield put({
      type: GET_DEPARTMENT_CATEGORIES_SUCCESS,
      payload: items
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: GET_DEPARTMENT_CATEGORIES_FAIL,
      payload: error
    });
  }
}
function* getDepartmentsSaga() {
  try {
    const data = yield call(filterService.getAllDepartments);
    yield put({
      type: GET_ALL_DEPARTMENTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    yield put({
      type: GET_ALL_DEPARTMENTS_FAIL,
      payload: error
    });
  }
}
function* getSingleDepartmentSaga(action) {
  try {
    const item = yield call(filterService.getSingleDepartment, action.payload);
    yield put({
      type: GET_SINGLE_DEPARTMENT_SUCCESS,
      payload: item
    });
  } catch (error) {
    yield put({
      type: GET_SINGLE_DEPARTMENT_FAIL,
      payload: error
    });
  }
}
export function* getCategoriesWatcher() {
  yield takeLatest(GET_ALL_CATEGORIES, getCategoriesSaga);
}
export function* getSingleCategoryWatcher() {
  yield takeEvery(GET_SINGLE_CATEGORY, getSingleCategorySaga);
}
export function* getDepartmentCategoriesWatcher() {
  yield takeLatest(GET_DEPARTMENT_CATEGORIES, getDepartmentCategoriesSaga);
}
export function* getProductCategoryWatcher() {
  yield takeEvery(GET_PRODUCT_CATEGORY, getProductCategorySaga);
}
export function* getDepartmentsWatcher() {
  yield takeLatest(GET_ALL_DEPARTMENTS, getDepartmentsSaga);
}
export function* getSingleDepartmentWatcher() {
  yield takeEvery(GET_SINGLE_DEPARTMENT, getSingleDepartmentSaga);
}
