import React from "react";
import {FaPlay } from 'react-icons/fa';

const ScrollDown = () => {
  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <p className='slide-show-parathree' onClick={handleClick}><u>RENT THE CAR OF YOUR DREAMS </u><FaPlay style={{marginLeft:'10px',marginBottom:'3px'}} /></p>
    </div>
  );
};

export default ScrollDown;
