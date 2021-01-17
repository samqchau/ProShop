import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBar = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        size='sm'
        type='text'
        name='q'
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        placeholder='Search Products'
        className=''
        style={{ height: '2.19rem' }}
      />
      <Button size='sm' type='submit' variant='outline-light' className='p-2'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
