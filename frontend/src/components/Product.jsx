import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded productCard'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <p>{product.name}</p>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={Math.ceil(
              product.reviews.reduce((acc, r) => {
                return acc + r.rating;
              }, 0) / product.reviews.length
            )}
            text={`${product.reviews.length} review${
              product.reviews.length !== 1 ? 's' : ''
            }`}
          />
        </Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
