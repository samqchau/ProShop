import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { listAllUsers } from '../actions/userActions';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const {
    userInfo: { isAdmin },
  } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { users, error, loading } = userList;

  useEffect(() => {
    dispatch(listAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!isAdmin) {
      history.push('/');
    }
  }, [history, isAdmin]);

  const deleteHandler = (userId) => {
    console.log('deleted');
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {user.isAdmin ? (
                      <i className='fas fa-check' style={{ color: 'green' }} />
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }} />
                    )}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LinkContainer to={`/user/${user._id}/edit`}>
                      <Button variant='info' className='btn-sm mr-2'>
                        <i className='fas fa-edit' />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => {
                        deleteHandler(user._id);
                      }}
                    >
                      <i className='fas fa-trash' />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
