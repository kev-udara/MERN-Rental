import React, { useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

function PasswordInput(props) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-input">
      <input
        type={showPassword ? 'text' : 'password'}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        style={{marginLeft:'168px',width:'280px'}}
      />
      <button type="button" onClick={togglePasswordVisibility} style={{border:'none',background:'none'}} className='eye-btn'>
        {showPassword ?  <EyeOutlined /> : <EyeInvisibleOutlined /> }
      </button>
    </div>
  );
}

export default PasswordInput;
