import React from 'react'
import {Row, Col, Form, Input} from 'antd'
import {Link} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { userRegister } from '../redux/actions/userActions'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import Spinner from '../components/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaBookmark, FaCar, FaEdit, FaMoneyBill, FaPlus, FaRemoveFormat, FaEnvelope } from "react-icons/fa";
// ..
AOS.init();

function Register(){
    const dispatch = useDispatch()
    const {loading} = useSelector(state=>state.alertsReducer)

      // Custom validation to check whether the password and confirm password match
    const validateConfirmPassword = ({getFieldValue}) => ({
        validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject('The two passwords that you entered do not match.');
        },
    });

    function onFinish(values){
        dispatch(userRegister(values))
        console.log(values)
    }

    return (
        <div className='login'>
            {loading && (<Spinner/>)}
            <Row gutter={16} className='d-flex align-items-center'>
                <Col lg={16} style={{position:'relative'}}>
                    <img 
                    data-aos='slide-up'
                    data-aos-duration='1500'
                    src='https://images.hdqwalls.com/download/2021-rolls-royce-black-badge-ghost-front-grill-af-1420x754.jpg'
                    alt=''
                    className='register-backgroundimg'
                    />
                    <h1 className='login-logo'></h1>
                </Col>
                <Col lg={8} className='text-left p-5' >
                    <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
                        <h1 className='login-form-title'>Sign Up</h1>
                        <hr />
                      <Form.Item name='username' label='Username' rules={[{required: true}]}>
                          <Input/>
                      </Form.Item>
                      <Form.Item name='email' label='Email' rules={[{required: true, type: 'email'}]}>
                        <Input />
                    </Form.Item>
                      <Form.Item name='password' label='Password' rules={[{required: true}]}>
                      <Input.Password style={{backgroundColor: '#333333' ,border:'none',color: 'white',opacity: '0.5'}}/>
                      </Form.Item> 
                      <Form.Item name='cpassword' label='Confirm Password' rules={[{required: true}, validateConfirmPassword]}>
                      <Input.Password style={{backgroundColor: '#333333' ,border:'none',color: 'white',opacity: '0.5'}}/>
                      </Form.Item>   
                      
                      <button className='btn1 mt-2 mb-2'>Sign Up</button>
                    
                      <Link to='/login' style={{marginLeft:'20px'}} className='login-register-redirect'><b>Click Here to Sign In</b></Link>
                    </Form>
                </Col>
            </Row>
            
        </div>
    )
}

export default Register