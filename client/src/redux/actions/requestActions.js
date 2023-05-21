import axios from 'axios';

import { message } from "antd";

export const userSubmit = (requestData) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.post("/api/requests/submit", requestData);
    message.success("Request form submitted successfully");
    dispatch({ type: "LOADING", payload: false });
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    console.log(error);
    message.success("Request form submitted successfully");
    dispatch({ type: "LOADING", payload: false });
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
};

export const getAllAdminRequests=()=>async dispatch=>{

    dispatch({type:'LOADING', payload:true})
    try{
        const response = await axios.get('/api/requests/getalladminrequests')
        dispatch({type:'GET_ALL_REQUESTS',payload:response.data})
        dispatch({type:'LOADING', payload:false})
    }catch(error){
        console.log(error)
        dispatch({type:'LOADING', payload:false})
    };
  };
  export const sendResponse = (requestId, responseText) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });
    try {
      await axios.post('/api/requests/sendresponse', {
        requestId,
        responseText
      });
  
      message.success('Response sent successfully');
      dispatch({ type: 'LOADING', payload: false });
      dispatch(getAllAdminRequests());
    } catch (error) {
      console.error(error);
      message.error('Failed to send the response');
      dispatch({ type: 'LOADING', payload: false });
    }
  };
  