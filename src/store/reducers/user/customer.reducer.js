import * as Actions from "../../actions/user";

const initialState = {
  authenticated: false,
  isLoading: false,
  error: {},
  data: {}
};

const auth = function(state = initialState, action) {
  switch (action.type) {
    case Actions.SIGN_UP: {
      return {
        ...state,
        isLoading: true
      };
    }
    case Actions.SIGN_UP_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        authenticated: true,
        isLoading: false
      };
    }
    case Actions.SIGN_UP_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case Actions.SIGN_IN: {
      return {
        ...state,
        isLoading: true
      };
    }
    case Actions.SIGN_IN_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        authenticated: true,
        isLoading: false
      };
    }
    case Actions.GET_CUSTOMER_SUCCESS: {
      return {
        ...state,
        data: { customer: action.payload },
        authenticated: true,
        isLoading: false
      };
    }
    case Actions.GET_CUSTOMER_FAIL: {
      return {
        ...state,
        error: { error: action.payload }
      };
    }
    case Actions.SIGN_IN_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case Actions.SIGN_OUT_SUCCESS: {
      return {
        ...initialState
      };
    }
    default: {
      return state;
    }
  }
};

export default auth;
