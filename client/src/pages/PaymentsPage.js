import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminDefaultLayout from '../components/AdminDefaultLayout';
import { useDispatch,useSelector } from 'react-redux';

import Spinner from '../components/Spinner';
const PaymentsPage = () => {
    const [payments, setPayments] = useState([]);
    const {loading} = useSelector((state)=> state.alertsReducer);
  
    useEffect(() => {
      fetchPayments();
    }, []);
  
    const fetchPayments = async () => {
      try {
        const response = await axios.get('/api/bookings/payments');
        setPayments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
  
    return (
      <AdminDefaultLayout>
      {loading && (<Spinner/>)}
      <br/> 
       <h3 className='text-center' style={{color:'rgb(254, 175, 56)'}}>Payment History</h3>
        <table className="payment-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Status</th>
              <th>Created</th>
              <th>Receipt URL</th>
              <th>Description</th>
              <th>Customer ID</th>
              <th>Customer Email</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.amount}</td>
                <td>{payment.currency}</td>
                <td>{payment.status}</td>
                <td>{payment.created}</td>
                <td>
                  {payment.receiptUrl ? (
                    <a href={payment.receiptUrl} target="_blank" rel="noopener noreferrer">
                      View Receipt
                    </a>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>{payment.description || 'N/A'}</td>
                <td>{payment.customer.id}</td>
                <td>{payment.customer.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
        </AdminDefaultLayout>
    );
  };
  
  export default PaymentsPage;
  