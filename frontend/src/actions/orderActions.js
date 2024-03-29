import axios from 'axios';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_FOR_USER_REQUEST,
  ORDER_LIST_FOR_USER_SUCCESS,
  ORDER_LIST_FOR_USER_FAIL,
  ORDER_LIST_FOR_ADMIN_REQUEST,
  ORDER_LIST_FOR_ADMIN_SUCCESS,
  ORDER_LIST_FOR_ADMIN_FAIL,
  ORDER_SET_SHIPPING_REQUEST,
  ORDER_SET_SHIPPING_SUCCESS,
  ORDER_SET_SHIPPING_FAIL,
} from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/orders', order, config);

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    dispatch({ type: ORDER_CREATE_RESET });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${orderId}`, config);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const listOrdersForUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_FOR_USER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/orders/myorders', config);
    dispatch({ type: ORDER_LIST_FOR_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FOR_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const listOrdersForAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_FOR_ADMIN_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    const { data } = await axios.get('/api/orders', config);
    dispatch({ type: ORDER_LIST_FOR_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FOR_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const shipOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_SET_SHIPPING_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    await axios.put(`/api/orders/${orderId}/shipping`, {}, config);
    dispatch({ type: ORDER_SET_SHIPPING_SUCCESS });
  } catch (error) {
    dispatch({
      type: ORDER_SET_SHIPPING_FAIL,
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
