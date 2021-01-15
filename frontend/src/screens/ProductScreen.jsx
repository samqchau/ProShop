import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  FormControl,
  Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GoBackButton from '../components/GoBackButton';

import Meta from '../components/Meta';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';

import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';

import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = ({ match, history }) => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    loading: createdReviewLoading,
    error: createdReviewError,
    success: createdReviewSuccess,
    message: createdReviewMessage,
  } = productCreateReview;

  useEffect(() => {
    if (createdReviewSuccess) {
      setRating(0);
      setComment('');
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, createdReviewSuccess]);

  useEffect(() => {
    return () => {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    };
  }, [dispatch]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${quantity}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const review = {
      comment,
      rating,
    };
    console.log(review);
    dispatch(createProductReview(match.params.id, review));
  };

  return (
    <>
      <GoBackButton history={history} />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={`ProShop | ${product.name}`} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>Price: ${product.price}</h3>
                </ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price: </Col>
                      <Col>
                        <strong>{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>{' '}
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status: </Col>
                      <Col>
                        {product.numberInStock > 0
                          ? 'In Stock'
                          : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.numberInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity:</Col>
                        <Col>
                          <FormControl
                            as='select'
                            style={{ height: '2.5rem' }}
                            value={quantity}
                            onChange={(e) => {
                              setQuantity(e.target.value);
                            }}
                          >
                            {[...Array(product.numberInStock).keys()].map(
                              (x) => (
                                <option value={x + 1} key={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className='btn-block'
                      type='button'
                      disabled={product.numberInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2 className='my-3'>Customer Reviews</h2>
              {!userInfo && (
                <Message variant='info'>
                  Please <Link to='/login'>login</Link> to leave a reivew
                </Message>
              )}
              {product.reviews.length === 0 && (
                <Message variant='info'>No Reviews Currently</Message>
              )}
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  {userInfo && (
                    <>
                      <h3>Review our product</h3>
                      {createdReviewError && (
                        <Message variant='danger'>{createdReviewError}</Message>
                      )}
                      {createdReviewLoading && <Loader />}
                      {createdReviewSuccess && (
                        <Message variant='success'>
                          {createdReviewMessage}
                        </Message>
                      )}
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={(e) => {
                              setRating(e.target.value);
                            }}
                            style={{ width: '130px' }}
                          >
                            <option value=''>Rating</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            rows='3'
                            value={comment}
                            onChange={(e) => {
                              setComment(e.target.value);
                            }}
                          ></Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='dark'>
                          Submit
                        </Button>
                      </Form>
                    </>
                  )}
                </ListGroup.Item>
                {product.reviews.map((review, index) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <span>{review.createdAt.substring(0, 10)}</span>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
