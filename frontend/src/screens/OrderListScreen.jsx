import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import GoBackButton from '../components/GoBackButton';
import Center from '../components/Center';

import { listOrdersForAdmin } from '../actions/orderActions';
import { ORDER_LIST_FOR_ADMIN_RESET } from '../constants/orderConstants';
import removeActive from '../util/removeActive';

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderListForAdmin = useSelector((state) => state.orderListForAdmin);
  const { loading, error, success, orders: ordersFromDB } = orderListForAdmin;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrdersForAdmin);
    } else {
      history.push('/login');
    }
  }, [userInfo, dispatch, history]);

  useEffect(() => {
    if (success) {
      dispatch({ type: ORDER_LIST_FOR_ADMIN_RESET });
      setOrders(ordersFromDB);
    }
  }, [success, dispatch, ordersFromDB]);

  useEffect(() => {
    removeActive();
    return () => {
      removeActive();
    };
  }, []);

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>Delievered</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>
                  <p>{order.user.name}</p>
                  <p style={{ marginTop: '-15px', marginBottom: '0' }}>
                    {order.user._id}
                  </p>
                </td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  <Center>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }} />
                    )}
                  </Center>
                </td>
                <td>
                  <Center>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }} />
                    )}
                  </Center>
                </td>
                <td>
                  <Center>
                    <LinkContainer to={`/order/${order._id}/edit`}>
                      <Button variant='dark' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
                  </Center>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <GoBackButton history={history} />
    </>
  );
};

export default OrderListScreen;
