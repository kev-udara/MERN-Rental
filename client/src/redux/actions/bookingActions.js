import axios from 'axios';
import { message } from 'antd';

export const bookCar=(reqobj)=>async dispatch=>{

    dispatch({type:'LOADING', payload:true})
    try{
        await axios.post('/api/bookings/bookcar', reqobj)
        
        dispatch({type:'LOADING', payload:false})
        message.success('Your car was rented successfully');
        setTimeout(()=>{
            window.location.href='/userbookings'
        },500);
        
    }catch(error){
        console.log(error)
        dispatch({type:'LOADING', payload:false})
        message.error('Something went wrong, please try later');

    }
};

export const bookAccessory=(reqobj)=>async dispatch=>{

    dispatch({type:'LOADING', payload:true})
    try{
        await axios.post('/api/bookings/bookaccessory', reqobj)
        
        dispatch({type:'LOADING', payload:false})
        setTimeout(()=>{
            message.success('Your accessory was rented successfully');
        },500);
        window.location.href='/accessorybookings'
    }catch(error){
        console.log(error)
        dispatch({type:'LOADING', payload:false})
        message.error('Something went wrong, please try later');

    }

};

export const getAllBookings=()=>async dispatch=>{

    dispatch({type:'LOADING', payload:true})
    try{
        const response = await axios.get('/api/bookings/getallbookings')
        dispatch({type:'GET_ALL_BOOKINGS',payload:response.data})
        dispatch({type:'LOADING', payload:false})
    }catch(error){
        console.log(error)
        dispatch({type:'LOADING', payload:false})
    };
};

export const getAllAdminBookings=()=>async dispatch=>{

    dispatch({type:'LOADING', payload:true})
    try{
        const response = await axios.get('/api/bookings/getalladminbookings')
        dispatch({type:'GET_ALL_BOOKINGS',payload:response.data})
        dispatch({type:'LOADING', payload:false})
    }catch(error){
        console.log(error)
        dispatch({type:'LOADING', payload:false})
    };
};

export const getAllAdminAccessoryBookings=()=>async dispatch=>{

    dispatch({type:'LOADING', payload:true})
    try{
        const response = await axios.get('/api/bookings/getalladminaccessorybookings')
        dispatch({type:'GET_ALL_BOOKINGS',payload:response.data})
        dispatch({type:'LOADING', payload:false})
    }catch(error){
        console.log(error)
        dispatch({type:'LOADING', payload:false})
    };
};

export const getAllAccessoryBookings=()=>async dispatch=>{

    dispatch({type:'LOADING', payload:true})
    try{
        const response = await axios.get('/api/bookings/getallaccessorybookings')
        dispatch({type:'GET_ALL_BOOKINGS',payload:response.data})
        dispatch({type:'LOADING', payload:false})
    }catch(error){
        console.log(error)
        dispatch({type:'LOADING', payload:false})
    };

};

export const cancelBookings=(reqObj)=>async dispatch=>{
    dispatch({type:'LOADING', payload:true})
    try{
        await axios.post('/api/bookings/cancelbookings', reqObj)
        dispatch({type:'LOADING', payload:false})
        message.success('Your booking was cancelled successfully')
        setTimeout(()=>{
          window.location.reload()
        },500);
    }catch(error){
        console.log(error)
        dispatch({type:'LOADING', payload:false})
    };
}

export const removeBookings=(reqObj)=>async dispatch=>{
    dispatch({type:'LOADING', payload:true})
    try{
        await axios.post('/api/bookings/removebookings', reqObj)
        dispatch({type:'LOADING', payload:false})
        message.success('Your booking was removed successfully')
        setTimeout(()=>{
          window.location.reload()
        },500);
    }catch(error){
        console.log(error)
        dispatch({type:'LOADING', payload:false})
    };
}

export const cancelAccessoryBookings=(reqObj)=>async dispatch=>{
    dispatch({type:'LOADING', payload:true})
    try{
        await axios.post('/api/bookings/cancelaccessorybookings', reqObj)
        dispatch({type:'LOADING', payload:false})
        message.success('Your booking was cancelled successfully')
        setTimeout(()=>{
          window.location.reload()
        },500);
    }catch(error){
        console.log(error)
        dispatch({type:'LOADING', payload:false})
    };
}

export const removeAccessoryBookings=(reqObj)=>async dispatch=>{
    dispatch({type:'LOADING', payload:true})
    try{
        await axios.post('/api/bookings/removeaccessorybookings', reqObj)
        dispatch({type:'LOADING', payload:false})
        message.success('Your booking was removed successfully')
        setTimeout(()=>{
          window.location.reload()
        },500);
    }catch(error){
        console.log(error)
        dispatch({type:'LOADING', payload:false})
    };
}

export const updateBookingStatus = (bookingId, status) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });
    try {
      const response = await axios.put(`/api/bookings/${bookingId}/status`, { status });
      dispatch({ type: 'UPDATE_BOOKING_STATUS', payload: response.data });
      dispatch({ type: 'LOADING', payload: false });
        setTimeout(()=>{
            message.success('Booking status updated')
        },500);
    } catch (error) {
      console.log(error);
      dispatch({ type: 'LOADING', payload: false });
      message.error('Something went wrong, please try later');
    }
  };
  
  export const updateAccessoryBookingStatus = (bookingId, status) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });
    try {
      const response = await axios.put(`/api/bookings/${bookingId}/accessorystatus`, { status });
      dispatch({ type: 'UPDATE_BOOKING_STATUS', payload: response.data });
      dispatch({ type: 'LOADING', payload: false });
        setTimeout(()=>{
            message.success('Booking status updated')
        },500);
    } catch (error) {
      console.log(error);
      dispatch({ type: 'LOADING', payload: false });
      message.error('Something went wrong, please try later');
    }
  };
  
