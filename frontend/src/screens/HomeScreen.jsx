import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { listProducts } from '../actions/productActions.js';

import Meta from '../components/Meta';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import GoBackButton from '../components/GoBackButton.jsx';

const HomeScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { products, loading, error, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? <ProductCarousel /> : <GoBackButton history={history} />}
      <Container className='homeScreenProductContainer py-3'>
        <h1 className='text-center'>Latest Products</h1>
        {loading ? (
          <Loader ypos='60%' />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row>
              {products.map((product) => (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate
              page={page}
              pages={pages}
              keyword={keyword ? keyword : ''}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
