import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Row, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { register, registerReset } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  useEffect(() => {
    return () => {
      dispatch(registerReset());
    };
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
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
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {message && <Message variant='danger'>{message}</Message>}
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
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        Have an Account?
        <Link
          className='ml-3'
          to={redirect ? `/login?redirect=${redirect}` : '/login'}
        >
          Login
        </Link>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
