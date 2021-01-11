import React, { useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';
import GoBackButton from '../components/GoBackButton';

import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import {
  PRODUCT_DELETE_RESET,
  PRODUCT_CREATE_RESET,
} from '../constants/productConstants';
import removeActive from '../util/removeActive';

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    success,
    error: productDeleteError,
    loading: productDeleteLoading,
    response,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: createProductLoading,
    success: createProductSuccess,
    error: createProductError,
    product: createdProduct,
    message: createProductMessage,
  } = productCreate;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push('/login');
    }
  }, [userInfo, history, dispatch, success]);

  useEffect(() => {
    if (createProductSuccess) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      history.push(`/admin/product/${createdProduct._id}/edit`);
    }
  }, [createProductSuccess, history, createdProduct, dispatch]);

  useEffect(() => {
    return () => {
      dispatch({ type: PRODUCT_DELETE_RESET });
    };
  }, [dispatch]);

  useEffect(() => {
    removeActive();
    return () => {
      removeActive();
    };
  }, []);

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus mr-2' /> Create Product
          </Button>
        </Col>
      </Row>
      {productDeleteLoading && <Loader />}
      {success && response && (
        <Message variant='success'>{response.message}</Message>
      )}
      {productDeleteError && (
        <Message variant='danger'>{productDeleteError}</Message>
      )}
      {createProductLoading && <Loader />}
      {createProductSuccess && createProductMessage && (
        <Message variant='success'>{createProductMessage}</Message>
      )}
      {createProductError && (
        <Message variant='danger'>{createProductError}</Message>
      )}

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
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='dark' className='btn-sm'>
                        <i className='fas fa-edit' />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => {
                        deleteHandler(product._id);
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
      <GoBackButton history={history} />
    </>
  );
};

export default ProductListScreen;
