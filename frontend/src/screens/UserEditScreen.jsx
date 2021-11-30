import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';
import GoBackButton from '../components/GoBackButton';
import FormContainer from '../components/FormContainer';

import { getUserDetails, adminUpdateUser } from '../actions/userActions';
import { USER_ADMIN_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userAdminUpdate = useSelector((state) => state.userAdminUpdate);
  const {
    success: adminUpdateSuccess,
    error: adminUpdateError,
    loading: adminUpdateLoading,
  } = userAdminUpdate;

  useEffect(() => {
    if (adminUpdateSuccess) {
      dispatch({ type: USER_ADMIN_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, dispatch, userId, adminUpdateSuccess, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    const updatedUser = {
      _id: userId,
      name,
      email,
      isAdmin,
    };
    dispatch(adminUpdateUser(updatedUser));
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
        {adminUpdateLoading && <Loader />}
        {adminUpdateError && (
          <Message variant='danger'>{adminUpdateError}</Message>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                autoComplete='off'
                placeholder='Enter name'
                value={name}
                onChange={nameChangeHandler}
              />
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                autoComplete='off'
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
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
