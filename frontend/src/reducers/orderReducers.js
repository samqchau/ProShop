import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_RESET,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_LIST_FOR_USER_REQUEST,
  ORDER_LIST_FOR_USER_SUCCESS,
  ORDER_LIST_FOR_USER_FAIL,
  ORDER_LIST_FOR_USER_RESET,
  ORDER_LIST_FOR_ADMIN_REQUEST,
  ORDER_LIST_FOR_ADMIN_SUCCESS,
  ORDER_LIST_FOR_ADMIN_FAIL,
  ORDER_LIST_FOR_ADMIN_RESET,
  ORDER_SET_SHIPPING_RESET,
  ORDER_SET_SHIPPING_REQUEST,
  ORDER_SET_SHIPPING_SUCCESS,
  ORDER_SET_SHIPPING_FAIL,
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return { ...state, success: false };
    default:
      return { ...state };
  }
};

export const orderDetailsReducer = (
  state = {
    order: {
      shippingAddress: {},
      orderItems: [],
      user: { name: '' },
    },
  },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { ...state, loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ORDER_DETAILS_RESET:
      return {
        order: { shippingAddress: {}, orderItems: [], user: { name: '' } },
      };
    default:
      return { ...state };
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderListForUserReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_FOR_USER_REQUEST:
      return { loading: true };
    case ORDER_LIST_FOR_USER_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FOR_USER_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_LIST_FOR_USER_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const orderListForAdminReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_FOR_ADMIN_REQUEST:
      return { loading: true };
    case ORDER_LIST_FOR_ADMIN_SUCCESS:
      return { loading: false, orders: action.payload, success: true };
    case ORDER_LIST_FOR_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_LIST_FOR_ADMIN_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const orderSetShippingReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_SET_SHIPPING_REQUEST:
      return { loading: true };
    case ORDER_SET_SHIPPING_SUCCESS:
      return { loading: false, success: true };
    case ORDER_SET_SHIPPING_FAIL:
      return { error: action.payload, loading: false };
    case ORDER_SET_SHIPPING_RESET:
      return {};
    default:
      return state;
  }
};
