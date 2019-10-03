import * as Actions from "../../actions/products";

const initialState = {
  isLoading: false,
  categories: [],
  error: {},
  currentCategory: {},
  departmentCategories: [],
  productCategories: []
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_ALL_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: action.payload.rows
      };
    }
    case Actions.GET_ALL_CATEGORIES_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case Actions.GET_DEPARTMENT_CATEGORIES_SUCCESS: {
      return {
        ...state,
        departmentCategories: action.payload
      };
    }
    case Actions.GET_DEPARTMENT_CATEGORIES_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case Actions.GET_SINGLE_CATEGORY_SUCCESS: {
      return {
        ...state,
        currentCategory: action.payload
      };
    }
    case Actions.GET_SINGLE_CATEGORY_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case Actions.GET_PRODUCT_CATEGORY_SUCCESS: {
      return {
        ...state,
        productCategories: action.payload
      };
    }
    case Actions.GET_PRODUCT_CATEGORY_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default categories;
