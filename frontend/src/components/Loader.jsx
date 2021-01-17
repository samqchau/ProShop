import React from 'react';
import { Spinner, Container, Row } from 'react-bootstrap';

const Loader = ({ xpos, ypos }) => {
  return (
    <Container>
      <Row>
        <Spinner
          animation='border'
          variant='light'
          role='status'
          style={{
            width: '25px',
            height: '25px',
            display: 'block',
            position: 'absolute',
            left: xpos,
            top: ypos,
          }}
        >
          <span className='sr-only'>Loading...</span>
        </Spinner>
      </Row>
    </Container>
  );
};

Loader.defaultProps = { xpos: '50%', ypos: '50%' };

export default Loader;
