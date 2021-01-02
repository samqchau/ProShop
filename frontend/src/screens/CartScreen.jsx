import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  FormControl,
} from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {
  const productID = match.params.id;
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, quantity));
    }
  }, [dispatch, productID, quantity]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <>
            <span
              className='btn btn-info my-3'
              onClick={() => {
                history.goBack();
              }}
            >
              Go Back
            </span>
            <Message>Cart is empty </Message>
          </>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.productID}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} fluid rounded alt={item.name} />
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item.productID}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>Price: ${item.price}</Col>
                  <Col md={2}>
                    <FormControl
                      as='select'
                      style={{ height: '2.5rem' }}
                      value={item.quantity}
                      onChange={(e) => {
                        dispatch(
                          addToCart(item.productID, Number(e.target.value))
                        );
                      }}
                    >
                      {[...Array(item.numberInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </FormControl>
                  </Col>
                  <Col>
                    <Button
                      type='button'
                      variant='light'
                      onClick={(e) => {
                        removeFromCartHandler(item.productID);
                      }}
                    >
                      <i className='fas fa-trash' />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2 className='myh2'>
                Subtotal (
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
