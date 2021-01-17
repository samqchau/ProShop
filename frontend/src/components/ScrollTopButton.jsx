import React, { useState, useEffect, useCallback } from 'react';

const ScrollTopButton = () => {
  const [displayed, setDisplayed] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setScrollPosition(0);
  };

  const handleScroll = useCallback(() => {
    setScrollPosition(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    scrollPosition > 20 ? setDisplayed(true) : setDisplayed(false);
  }, [scrollPosition]);

  return (
    <i
      className='far fa-arrow-alt-circle-up fa-3x scrollTopButton'
      style={{ opacity: `${displayed ? '1' : '0'}` }}
      onClick={scrollTop}
      onScroll={handleScroll}
    />
  );
};

export default ScrollTopButton;
