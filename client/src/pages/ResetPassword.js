import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../redux/actions/userActions';
import { notification } from 'antd';
import PasswordInput from '../components/PasswordInput';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { resetToken } = useParams();
  const history = useHistory();

  const handleResetPassword = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      const response = await axios.post(`/api/users/reset-password/${resetToken}`, {
        password: password,
        confirmPassword: confirmPassword,
      });
      notification.success({message: 'Success', description:'Request link was sent to your email'})
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    } catch (error) {
      notification.error("Something went wrong");
    }
    
  };
  

  return (
    <div className='resetpassword'>
    <img src='https://wallpapercave.com/wp/wp9286640.jpg' alt='' height='900px' style={{marginTop:'-360px'}} className='forgotpasswordbg'/>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword} className='resetpassword-form p-5'>
        <h1 className='resetpassword-form-title'>Reset Password</h1>
        <hr />
        <div>
          <label className='resetpasswordlabel'>Password: </label>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <label className='resetconfirmpasswordlabel'>Confirm Password: </label>
          <PasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='forgotpasswordbtn' value='Reset Password'
        >Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
