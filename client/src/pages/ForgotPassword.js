import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { notification } from 'antd';

function ForgotPassword () {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');



  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/users/forgot-password', { email });
      notification.success({message: 'Success', description:'Request link was sent to your email'})
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    } catch (error) {
      notification.error("Something went wrong");
    }
  };

  return (
    <div className='forgotpassword'>
    <img src='https://wallpapercave.com/wp/wp9286640.jpg' alt='' height='900px' style={{marginTop:'-360px'}} className='forgotpasswordbg'/>
      <h2>Forgot Password</h2>
      <form onSubmit={onSubmit} layout='vertical' className='forgotpassword-form p-5'>
      <h1 className='forgotpassword-form-title'>Forgot Password ?</h1>
                        <hr />
                        <div>
          <label>Email:</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{marginLeft:'12px'}}
            className='forgotpasswordinput'
          />
        </div>
        <button type='submit' className='forgotpasswordbtn'>Send Reset Link</button>
      </form>
      {message && <div>{message}</div>}
      <Link to='/login'>Back to Login</Link>
    </div>
  );
};

export default ForgotPassword;
