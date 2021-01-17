import React from 'react';

const Center = ({ children }) => {
  return (
    <div
      style={{
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      {children}
    </div>
  );
};

export default Center;
