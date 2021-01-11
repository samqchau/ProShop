import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';
import GoBackButton from '../components/GoBackButton';
import FormContainer from '../components/FormContainer';

import { listProductDetails } from '../actions/productActions';
import {} from '../constants/productConstants';

const ProductEditScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [countInStock, setCountInStock] = useState(0);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setDescription(product.description);
      setCountInStock(product.countInStock);
    }
  }, [product, dispatch, productId]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <GoBackButton history={history} />
      <FormContainer>
        <h1>Edit Product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Product Name'
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                placeholder='0'
                type='number'
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                placeholder='Enter Product Brand'
                type='name'
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                placeholder='Enter Product Category'
                type='name'
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                placeholder='Enter Product Description'
                type='name'
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                placeholder='Enter Number in Stock'
                type='number'
                value={countInStock}
                onChange={(e) => {
                  setCountInStock(e.target.value);
                }}
              />
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

export default ProductEditScreen;
