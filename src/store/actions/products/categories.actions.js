export const GET_DEPARTMENT_CATEGORIES = "GET_DEPARTMENT_CATEGORIES";
export const GET_DEPARTMENT_CATEGORIES_SUCCESS =
  "GET_DEPARTMENT_CATEGORIES_SUCCESS";
export const GET_DEPARTMENT_CATEGORIES_FAIL = "GET_DEPARTMENT_CATEGORIES_FAIL";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const GET_ALL_CATEGORIES_SUCCESS = "GET_ALL_CATEGORIES_SUCCESS";
export const GET_ALL_CATEGORIES_FAIL = "GET_ALL_CATEGORIES_FAIL";
export const GET_PRODUCT_CATEGORY = "GET_PRODUCT_CATEGORY";
export const GET_PRODUCT_CATEGORY_FAIL = "GET_PRODUCT_CATEGORY_FAIL";
export const GET_PRODUCT_CATEGORY_SUCCESS = "GET_PRODUCT_CATEGORY_SUCCESS";
export const GET_SINGLE_CATEGORY = "GET_SINGLE_CATEGORY";
export const GET_SINGLE_CATEGORY_SUCCESS = "GET_SINGLE_CATEGORY_SUCCESS";
export const GET_SINGLE_CATEGORY_FAIL = "GET_SINGLE_CATEGORY_FAIL";
export const GET_SINGLE_DEPARTMENT = "GET_SINGLE_DEPARTMENT";
export const GET_SINGLE_DEPARTMENT_SUCCESS = "GET_SINGLE_DEPARTMENT_SUCCESS";
export const GET_SINGLE_DEPARTMENT_FAIL = "GET_SINGLE_DEPARTMENT_FAIL";
export const GET_ALL_DEPARTMENTS = "GET_ALL_DEPARTMENTS";
export const GET_ALL_DEPARTMENTS_SUCCESS = "GET_ALL_DEPARTMENTS_SUCCESS";
export const GET_ALL_DEPARTMENTS_FAIL = "GET_ALL_DEPARTMENTS_FAIL";

export function getAllCategories() {
  return {
    type: GET_ALL_CATEGORIES
  };
}

export function getSingleCategory(category_id) {
  return {
    type: GET_SINGLE_CATEGORY,
    payload: category_id
  };
}

export function getProductCategory(product_id) {
  return {
    type: GET_PRODUCT_CATEGORY,
    payload: product_id
  };
}

export function getDepartmentCategories(department_id) {
  return {
    type: GET_DEPARTMENT_CATEGORIES,
    payload: department_id
  };
}

export function getAllDepartments() {
  return {
    type: GET_ALL_DEPARTMENTS
  };
}

export function getSingleDepartment(department_id) {
  return {
    type: GET_SINGLE_CATEGORY,
    payload: department_id
  };
}
