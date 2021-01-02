import React from 'react';
import { Spinner, Container, Row } from 'react-bootstrap';

const Loader = () => {
  return (
    <Container>
      <Row>
        <Spinner
          animation='border'
          variant='info'
          role='status'
          style={{
            width: '25px',
            height: '25px',
            display: 'block',
            position: 'absolute',
            left: '50%',
            top: '50%',
          }}
        >
          <span className='sr-only'>Loading...</span>
        </Spinner>
      </Row>
    </Container>
  );
};

export default Loader;
