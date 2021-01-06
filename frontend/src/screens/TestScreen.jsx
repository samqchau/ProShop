import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderDetails } from '../actions/orderActions';

const TestScreen = () => {
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order } = orderDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(order);
    dispatch(getOrderDetails('5ff58846ae2db852e443a8d5'));
  }, []);

  const handleClick = () => {
    console.log(orderDetails);
  };

  return <button onClick={handleClick}></button>;
};

export default TestScreen;
