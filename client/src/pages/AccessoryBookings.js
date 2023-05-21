import React,{useState, useEffect} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch,useSelector } from 'react-redux'
import { getAllAccessoryBookings, cancelAccessoryBookings,removeAccessoryBookings } from '../redux/actions/bookingActions'
import {Col, Row, Popconfirm} from 'antd'
import moment from 'moment'
import Spinner from '../components/Spinner';
import { FaCross, FaWindowClose, FaXbox } from 'react-icons/fa'

function AccessoryBookings() {

  const dispatch = useDispatch();
  const {bookings} = useSelector(state => state.bookingsReducer);
  const {loading} = useSelector((state)=> state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllAccessoryBookings());
  }, []);
  
  
  return (
    <DefaultLayout>
    {loading && (<Spinner/>)}
    <br/> 
     <h3 className='text-center' style={{color:'rgb(254, 175, 56)'}}>My Bookings</h3>

     <Row justify='center' gutter={16}>
      <Col lg={17} sm={24}>
         
             {bookings.filter(o=>o.user == user._id).map((booking) => { 
              return <Row  gutter={16} className='bs1 mt-3 p-2 text-left'  style={{backgroundColor:'rgb(254, 175, 56)',borderRadius:5}}>
               
                <Col lg={6} sm={24} className='userbookingscolone'>
                  <p style={{marginLeft:'8px'}}><b>{booking.accessory.name}</b></p>
                  <p style={{marginLeft:'8px'}}>Total Hours : <b>{booking.totalHours}</b></p>
                  <p style={{marginLeft:'8px'}}>Rent per hour : <b>Rs. {booking.accessory.rentPerHour}/-</b></p>
                  <p style={{marginLeft:'8px'}}>Total Amount : <b>Rs. {booking.totalAmount}/-</b></p>
                </Col>

                <Col lg={9} sm={24} className='userbookingscolone'>
                  <p>From : <b>{booking.bookedTimeSlots.from}</b></p>
                  <p>To : <b>{booking.bookedTimeSlots.to}</b></p>
                  <p>Date of Booking : <b>{moment(booking.createdAt).format('MMM DD yyyy')}</b></p>
                  <p>Status : <b>{booking.status === 'orderplaced' ? 'Order Placed' : booking.status === 'orderconfirmed' ? 'Order Confirmed' : booking.status === 'outfordelivery' ? 'Out for delivery' : 'Complete'}</b></p>
                </Col>

                <Col lg={4} sm={24} className='text-right'>
                  <img style={{borderRadius:15, marginTop:'2px'}} src={booking.accessory.image} alt='' height='150' className='userbookingscarimg'/>
                </Col>

                <Col lg={4} sm={24} className='text-right'>
                {booking.status !== 'outfordelivery' && booking.status !== 'complete' && (
                        <Popconfirm
                        title="Are you sure you want to cancel this booking ?"
                        onConfirm={()=>{dispatch(cancelAccessoryBookings({bookingid: booking._id, bookedTimeSlots : booking.bookedTimeSlots}))}}
                        okText="Yes"
                        cancelText="No">
                        <button className="cancelbookingbtn" style={{marginTop:'62px',marginLeft:'65px'}}>Cancel Booking</button>
                        </Popconfirm>
                        )}   
                </Col>
                <Col lg={1}>
                {booking.status !== 'orderplaced' && booking.status !== 'orderconfirmed' && booking.status !== 'outfordelivery' && (
                <Popconfirm
            title="Are you sure you want to remove this booking ?"
            onConfirm={()=>{dispatch(removeAccessoryBookings({bookingid: booking._id, bookedTimeSlots : booking.bookedTimeSlots}))}}
            okText="Yes"
            cancelText="No"
        >
            <button className='closebookingbtn'><FaWindowClose/></button>
        </Popconfirm> 
        )} 
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
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/>
    </DefaultLayout>
  )
}

export default AccessoryBookings