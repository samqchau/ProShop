import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';
import GoBackButton from '../components/GoBackButton';
import FormContainer from '../components/FormContainer';

import { getUserDetails } from '../actions/userActions';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user, dispatch, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const isAdminChangeHandler = (e) => {
    setIsAdmin(e.target.checked);
  };

  return (
    <>
      <GoBackButton history={history} />
      <FormContainer>
        <h1>Edit User</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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
            <Form.Group controlId='isAdmin'>
              <Form.Check
                style={{ display: 'inline-block' }}
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={isAdminChangeHandler}
              />{' '}
            </Form.Group>
            <Button type='submit' variant='dark'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
