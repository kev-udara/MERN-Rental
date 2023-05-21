import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../redux/actions/userActions';
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
      const response = await axios.post(
        `/api/users/reset-password/${resetToken}`,
        {
          password: password,
          confirmPassword: confirmPassword,
        }
      );

      // Open a new window with success message
      const successWindow = window.open('', '_blank');
      successWindow.document.write(`
        <html>
          <body>
            <div style="display: flex; align-items: center; justify-content: center; height: 100vh;">
              <div style="text-align: center;">
                <h3>Password reset successful!</h3>
                <p>Your password has been reset.</p>
              </div>
            </div>
          </body>
        </html>
      `);

      // Close the current window
      window.close();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='resetpassword'>
      <img
        src='https://wallpapercave.com/wp/wp9286640.jpg'
        alt=''
        height='900px'
        style={{ marginTop: '-360px' }}
        className='forgotpasswordbg'
      />
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword} className='resetpassword-form p-5'>
        <h1 className='resetpassword-form-title'>Reset Password</h1>
        <hr />
        <div>
          <label className='resetpasswordlabel'>Password: </label>
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
          <label className='resetconfirmpasswordlabel'>Confirm Password: </label>
          <PasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='forgotpasswordbtn' value='Reset Password'>
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
