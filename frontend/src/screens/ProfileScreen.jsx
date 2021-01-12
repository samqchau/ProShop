import React, { useState, useEffect } from 'react';
import { Form, Row, Button, Col, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import removeActive from '../util/removeActive';

import {
  getUserDetails,
  updateUserProfile,
  updateLoginInfo,
} from '../actions/userActions';

import { listOrdersForUser } from '../actions/orderActions';

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListForUser = useSelector((state) => state.orderListForUser);
  const {
    orders: ordersList,
    loading: ordersListLoading,
    error: ordersListError,
  } = orderListForUser;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
        dispatch(listOrdersForUser());
      } else {
        setName(userInfo.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, user, dispatch]);

  useEffect(() => {
    removeActive();
    return () => {
      removeActive();
    };
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      dispatch(
        updateLoginInfo({
          id: user._id,
          name,
          email,
          isAdmin: userInfo.isAdmin,
          token: userInfo.token,
        })
      );
    }
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {error && <Message variant='danger'>{error}</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        {success && (
          <Message variant='success'>Account Information Updated</Message>
        )}
        {loading && <Loader></Loader>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder='Enter name'
              value={name}
              onChange={nameChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={emailChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              value={password}
              onChange={passwordChangeHandler}
              placeholder='Enter password'
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Re-enter Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={confirmPasswordHandler}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='dark'>
            Update
          </Button>
        </Form>
      </Col>
      <Col me={9}>
        <h2>My Orders</h2>
        {ordersListLoading ? (
          <Loader />
        ) : ordersListError ? (
          <Message variant='danger'>{ordersListError}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
              </tr>
            </thead>
            <tbody>
              {ordersList.map((order) => (
                <tr key={order._id}>
                  <td style={{ textAlign: 'center' }}>{order._id}</td>
                  <td style={{ textAlign: 'center' }}>
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td style={{ textAlign: 'center' }}>{order.totalPrice}</td>
                  <td style={{ textAlign: 'center' }}>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <div className='d-flex justify-content-center'>
                        <i className='fas fa-times' style={{ color: 'red' }} />
                      </div>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <div className='d-flex justify-content-center'>
                        <i className='fas fa-times' style={{ color: 'red' }} />
                      </div>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='dark'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
