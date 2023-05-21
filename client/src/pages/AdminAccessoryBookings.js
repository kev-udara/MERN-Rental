import React,{useState, useEffect} from 'react'
import AdminDefaultLayout from '../components/AdminDefaultLayout'
import { useDispatch,useSelector } from 'react-redux'
import { getAllAdminAccessoryBookings,updateAccessoryBookingStatus } from '../redux/actions/bookingActions'
import {Col, Row,Select} from 'antd'
import moment from 'moment'
import Spinner from '../components/Spinner';

import { Option } from 'antd/lib/mentions'

function AdminAccessoryBookings() {

  const dispatch = useDispatch();
  const {bookings} = useSelector(state => state.bookingsReducer);
  const {loading} = useSelector((state)=> state.alertsReducer);
  const [filter, setFilter] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const uniqueAccessoryNames = [...new Set(bookings.map(({ accessory }) => accessory.name))];
  
  
  const handleChangeStatusFilter = (value) => {
    setFilterStatus(value);
  };
  const [value, setValue] = useState('orderplaced');

  const handleChange = (bookingId, value) => {
    dispatch(updateAccessoryBookingStatus(bookingId, value));
  };

  useEffect(() => {
    dispatch(getAllAdminAccessoryBookings());
  }, []);
  
  return (
    <AdminDefaultLayout>
    {loading && (<Spinner/>)}
    <br/> 
     <h3 className='text-center' style={{color:'rgb(254, 175, 56)'}}>All Bookings</h3>

     <Row justify='center' gutter={16}>
      <Col lg={18} sm={24}>
      <div style={{ marginBottom: '1rem' }}>

<label className='text-center' style={{ color: 'rgb(254, 175, 56)' }}>Filter by Cars:</label>
<Select
  defaultValue=""
  style={{ width: 170, marginRight: '1rem',marginLeft: '12px'  }}
  onChange={value => setFilter(value)}
>
  <Option value="">All accessories</Option>
  {uniqueAccessoryNames.map((accessoryName) => (
    <Option value={accessoryName}>{accessoryName}</Option>
  ))}
</Select>
 <label className='text-center' style={{ color: 'rgb(254, 175, 56)' }}>Filter by Status:</label>
            <Select
              style={{ width: 170, marginLeft: '12px' }}
              onChange={handleChangeStatusFilter}
              value={filterStatus}
            >
              <Option value=''>All</Option>
              <Option value='orderplaced'>Order Placed</Option>
              <Option value='orderconfirmed'>Order Confirmed</Option>
              <Option value='outfordelivery'>Out for Delivery</Option>
              <Option value='complete'>Complete</Option>
            </Select>
<label className='text-center' style={{ color: 'rgb(254, 175, 56)',marginLeft:'12px' }}>Sort by:</label>
      <Select
        defaultValue="desc"
        style={{ width: 120, marginLeft: '12px' }}
        onChange={value => setSortOrder(value)}
      >
        <Option value="desc">Latest first</Option>
        <Option value="asc">Oldest first</Option>
      </Select>
      
    </div>
             {bookings
              .filter(({ accessory }) => (filter ? accessory.name === filter : true))
      .filter((booking) => (filterStatus ? booking.status === filterStatus : true))
      .sort((a, b) =>
        sortOrder === 'desc'
          ? moment(b.createdAt).diff(a.createdAt)
          : moment(a.createdAt).diff(b.createdAt)
      ).map((booking) => { 
              return <Row  gutter={16} className='adminbookingrow mt-3 p-2 text-left'  style={{backgroundColor:'rgb(254, 175, 56)',borderRadius:5}}>
                <Col lg={6} sm={24} className='mt-2'>
                  <p style={{marginLeft:'8px'}}>User : <b>{booking.user.username}</b></p>
                  <p style={{marginLeft:'8px'}}>Accessory : <b>{booking.accessory.name}</b></p>
                  <p style={{marginLeft:'8px'}}>Rent per hour : <b>Rs. {booking.accessory.rentPerHour}/-</b></p>
                  <p style={{marginLeft:'8px'}}>Total Amount : <b>Rs. {booking.totalAmount}/-</b></p>
                </Col>

                <Col lg={9} sm={24} className='adminbookingsecondrow mt-2'>
                  <p>Transaction ID : <b>{booking.transactionId}</b></p>
                  <p>From : <b>{booking.bookedTimeSlots.from}</b></p>
                  <p>To : <b>{booking.bookedTimeSlots.to}</b></p>
                  <p>Date of Booking : <b>{moment(booking.createdAt).format('MMM DD yyyy')}</b></p>
                </Col>

                <Col lg={4} sm={24} className='text-right'>
                  <img style={{borderRadius:15}} src={booking.accessory.image} alt='' height='150' className='p-2'/>
                </Col>
                <Col lg={4} sm={24} className='text-right'style={{marginLeft:'35px',marginTop:'56px'}}>
                <Select
      value={booking.status}
  style={{
    width: 142,
    textAlign:'center',
    backgroundColor:'red'
  }}
  className='adminselectbox'
  onChange={(value) => handleChange(booking._id, value)}
  options={[    {      value: 'orderplaced',      label: 'Order Placed',    },    {      value: 'orderconfirmed',      label: 'Order Confirmed',    },    {      value: 'outfordelivery',      label: 'Out for delivery',    },    {      value: 'complete',      label: 'Complete'    },  ]}
  />
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
     
    </AdminDefaultLayout>
  )
}

export default AdminAccessoryBookings