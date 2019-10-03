import * as Actions from "../../actions/products";

const initialState = {
  isLoading: false,
  departments: [],
  error: {},
  currentDepartment: {}
};

const departments = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_ALL_DEPARTMENTS_SUCCESS: {
      return {
        ...state,
        departments: action.payload
      };
    }
    case Actions.GET_ALL_DEPARTMENTS_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case Actions.GET_SINGLE_DEPARTMENT_SUCCESS: {
      return {
        ...state,
        currentDepartment: action.payload
      };
    }
    case Actions.GET_SINGLE_DEPARTMENT_FAIL: {
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

export default departments;
