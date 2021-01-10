import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { listAllUsers, deleteUser } from '../actions/userActions';
import { USER_DELETE_RESET } from '../constants/userConstants';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { users, error, loading } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    success: userDeleteSuccess,
    error: userDeleteError,
    //loading: userDeleteLoading,
  } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAllUsers());
    } else {
      history.push('/login');
    }
    return () => {
      dispatch({ type: USER_DELETE_RESET });
    };
  }, [dispatch, userInfo, history, userDeleteSuccess]);

  const deleteHandler = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {userDeleteError && (
            <Message variant='danger'>{userDeleteError}</Message>
          )}
          {userDeleteSuccess && (
            <Message variant='success'>User Removed</Message>
          )}
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
                        <i
                          className='fas fa-check'
                          style={{ color: 'green' }}
                        />
                      ) : (
                        <i className='fas fa-times' style={{ color: 'red' }} />
                      )}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
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
        </>
      )}
    </>
  );
};

export default UserListScreen;
