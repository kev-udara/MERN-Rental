import React,{useState, useEffect} from 'react'
import AdminDefaultLayout from '../components/AdminDefaultLayout'
import { useDispatch,useSelector } from 'react-redux'
import { getAllUsers } from '../redux/actions/userActions'
import {Col, Row,Select} from 'antd'
import moment from 'moment'
import Spinner from '../components/Spinner';
import { FaMailBulk } from 'react-icons/fa';
import axios from "axios";
import { notification } from 'antd';


function ProvideCoupon() {

  const dispatch = useDispatch();
  const {users} = useSelector(state => state.usersReducer);
  const {loading} = useSelector((state)=> state.alertsReducer);
  const [totalUsers , setTotalusers] =useState([])
  const [coupon, setCoupon] = useState("");

  useEffect(()=> {
      dispatch(getAllUsers())
  },[])

  useEffect(() => {
      setTotalusers(users)
      setCoupon(Array(users.length).fill(""));
  }, [users]);

  const handleChange = (event, index) => {
    const newCoupons = [...coupon];
    newCoupons[index] = event.target.value;
    setCoupon(newCoupons);
  };
  
  

  const [value, setValue] = useState('orderplaced');


const sendCoupon = (email, coupon) => {
  axios
    .post("/api/admin/send-coupon", { email, coupon })
    .then((response) => {
      console.log(response.data);
      notification.success({message: 'Success', description:'Discount code was sent to user email'})
      setTimeout(()=>{
        window.location.reload()
      },700);
    })
    .catch((error) => {
      console.log(error);
    });
};

  
  console.log(users);

  return (
    <AdminDefaultLayout>
    {loading && (<Spinner/>)}
    <br/> 
     <h3 className='text-center' style={{color:'rgb(254, 175, 56)'}}>Provide Coupon</h3>

     <Row justify='center' gutter={16}>
      <Col lg={18} sm={24}>
         
             {totalUsers.map((user, index)=> { 
              return <Row  gutter={16} className='providecouponrow mt-3 p-2 text-left'  style={{backgroundColor:'rgb(254, 175, 56)',borderRadius:5}}>
                <Col lg={6} sm={24} className='mt-2'>
                  <p style={{marginLeft:'8px'}}>User : <b>{user.username}</b></p>
                </Col>
                <Col lg={6} sm={24} className='mt-2'>
                  <p style={{marginLeft:'1px'}}>E-mail : <b>{user.email}</b></p>
                </Col>
                <Col lg={7} sm={24} className='mt-2 ml-5'>
                  Discount Coupon :<input  style={{marginLeft:'10px'}} value={coupon[index]} onChange={(event) => handleChange(event, index)}/>
                </Col>
                <Col lg={1} sm={24} className='mt-2'>
                  <button className='btn1' onClick={() => sendCoupon(user.email, coupon)}>Send <FaMailBulk/></button>
                </Col>
              </Row>
             })}
      </Col>
     </Row>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
    </AdminDefaultLayout>
  )
}

export default ProvideCoupon