import React from 'react'
import {Row, Col, Form, Input} from 'antd'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { userLogin } from '../redux/actions/userActions'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import Spinner from '../components/Spinner'
import { adminLogin } from '../redux/actions/adminActions'
// ..
AOS.init();

function Login(){

    const dispatch= useDispatch()
    const {loading} = useSelector(state=>state.alertsReducer)
    function onFinish(values){
        if(values.username === 'admin'){
            dispatch(adminLogin(values))
        }else{
            dispatch(userLogin(values))
        }
            
            console.log(values)
    }


    return (
        <div className='login'>
            {loading && (<Spinner/>)}
            <Row gutter={16} className='d-flex align-items-center'>
                <Col lg={16} style={{position:'relative'}}>
                    <img 
                    data-aos='slide-right'
                    data-aos-duration='1500'
                    src='https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1020&q=768'
                    alt=''
                    className='login-backgroundimg'
                    />
            
                </Col>
                <Col lg={8} className='text-left p-5'>
                    <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
                        <h1 className='login-form-title'>Sign In</h1>
                        <hr />
                      <Form.Item name='username' label='Username' rules={[{required: true}]}>
                          <Input/>
                      </Form.Item>
                      <Form.Item name='password' label='Password' rules={[{required: true}]}>
                          <Input.Password style={{backgroundColor: '#333333' ,border:'none',color: 'white',opacity: '0.5'}}/>
                      </Form.Item>  
                      
                      <button className='btn1 mt-2 mb-2'>Sign In</button>
                      <Link to='/register' style={{marginLeft:'20px'}} className='login-register-redirect'><b>Click Here to Register</b></Link><br/>
                      <Link to="/forgot-password" className='forgotpasswordlink' style={{marginLeft:'10px'}}>Forgot Password ?</Link>
                    </Form>
                </Col>
            </Row>
            
        </div>
    )
    
}


export default Login
