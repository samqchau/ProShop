import React from 'react';

const GoBackButton = ({ history }) => {
  return (
    <div
      className='btn btn-primary my-3'
      onClick={() => {
        history.goBack();
      }}
    >
      Go Back
    </div>
  );
};

export default GoBackButton;
