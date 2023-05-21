import axios from 'axios';

import { message } from "antd";
export const userSubmit = (data) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.post("/api/reports/submit", data);
    message.success("Report submitted successfully");
    dispatch({ type: "LOADING", payload: false });
    setTimeout(() => {
      window.location.href = "/userreportlist";
    }, 500);
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const getAllReports = () => async dispatch => {
  dispatch({type:'LOADING', payload:true})
  try {
    const response = await axios.get('/api/reports/getallreports'); 
    dispatch({type: 'GET_ALL_REPORTS',payload: response.data});
    dispatch({type:'LOADING', payload:false})
  } catch (error) {
    console.error(error);
    dispatch({type:'LOADING', payload:false})
  }
};

export const getAllAdminReports=()=>async dispatch=>{

  dispatch({type:'LOADING', payload:true})
  try{
      const response = await axios.get('/api/reports/getalladminreports')
      dispatch({type:'GET_ALL_REPORTS',payload:response.data})
      dispatch({type:'LOADING', payload:false})
  }catch(error){
      console.log(error)
      dispatch({type:'LOADING', payload:false})
  };
};

export const updateReportStatus = (reportId, status) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    const response = await axios.put(`/api/reports/${reportId}/status`, { status });
    dispatch({ type: 'UPDATE_REPORT_STATUS', payload: response.data });
    dispatch({ type: 'LOADING', payload: false });
      setTimeout(()=>{
          message.success('Report status updated')
      },500);
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
    message.error('Something went wrong, please try later');
  }
};
