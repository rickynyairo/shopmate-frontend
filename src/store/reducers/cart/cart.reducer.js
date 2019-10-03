import * as Actions from "../../actions/cart";

const initialState = {
  isLoading: false,
  cart_id: "",
  isEmpty: true,
  items: [],
  error: {},
  count: 0
};

const cart = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_CART_ID: {
      return {
        ...state,
        isLoading: true
      };
    }
    case Actions.GET_CART_ID_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        cart_id: action.payload
      };
    }
    case Actions.GET_CART_ID_FAIL: {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    }
    case Actions.ADD_TO_CART: {
      return {
        ...state,
        isLoading: true
      };
    }
    case Actions.ADD_TO_CART_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isEmpty: false,
        error: {},
        items: [...action.payload],
        count: action.payload.length
      };
    }
    case Actions.ADD_TO_CART_FAIL: {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    }
    case Actions.EMPTY_CART: {
      return {
        ...state,
        isLoading: true
      };
    }
    case Actions.EMPTY_CART_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isEmpty: true,
        error: {},
        items: []
      };
    }
    case Actions.EMPTY_CART_FAIL: {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    }
    case Actions.GET_ITEMS_IN_CART_SUCCESS: {
      return {
        ...state,
        isEmpty: false,
        items: [...action.payload],
        count: action.payload.length
      };
    }
    case Actions.GET_ITEMS_IN_CART_FAIL: {
      return {
        ...state,
        error: action.payload,
        items: []
      };
    }
    default: {
      return state;
    }
  }
};

export default cart;
