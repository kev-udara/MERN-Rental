import React from "react";
import {FaPlay } from 'react-icons/fa';

const ContactUsScrollDown = () => {
  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <p className='slide-show-parathree' onClick={handleClick}><u>CONTACT US NOW </u><FaPlay style={{marginLeft:'10px',marginBottom:'3px'}} /></p>
    </div>
  );
};

export default ContactUsScrollDown;
