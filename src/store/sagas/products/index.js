import { all } from "redux-saga/effects";
import { getAllProductsWatcher } from "./get_all_products.saga";
import {
  getProductCategoryWatcher,
  getDepartmentCategoriesWatcher,
  getSingleCategoryWatcher,
  getCategoriesWatcher,
  getSingleDepartmentWatcher,
  getDepartmentsWatcher
} from "./categories.saga";

export default function* productsSaga() {
  yield all([
    getAllProductsWatcher(),
    getCategoriesWatcher(),
    getSingleCategoryWatcher(),
    getDepartmentCategoriesWatcher(),
    getProductCategoryWatcher(),
    getDepartmentsWatcher(),
    getSingleDepartmentWatcher()
  ]);
}
