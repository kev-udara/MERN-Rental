import axios from "axios";
import { message } from "antd";

export const userLogin=(reqObj)=>async dispatch=>{
    dispatch({type:'LOADING', payload:true})
    try{
        const response = await axios.post('/api/users/login', reqObj)
        localStorage.setItem('user',JSON.stringify(response.data))
        message.success('Login successful')
        dispatch({type:'LOADING', payload:false})
        setTimeout(()=>{
            window.location.href='/'
            
        }, 500);
    }catch(error){
        console.log(error)
        message.error('Something went wrong')
        dispatch({type:'LOADING', payload:false})
    }

}

export const userRegister = (reqObj) => async (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
    try {
      const response = await axios.post("/api/users/register", reqObj);
      message.success("Registration successful");
      dispatch({ type: "LOADING", payload: false });
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (error) {
      console.log(error);
      message.success("Registration successful");
      dispatch({ type: "LOADING", payload: false });
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    }
  };

  export const resetPassword = (resetToken, password, confirmPassword) => async (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
  
    try {
      const response = await axios.post(`/api/users/reset-password/${resetToken}`, { password, confirmPassword });
      message.success(response.data.message);
      dispatch({ type: "LOADING", payload: false });
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    } catch (error) {
      console.log(error);
      message.error(error.response.data.error);
      dispatch({ type: "LOADING", payload: false });
    }
  };

  export const getAllUsers=()=>async dispatch=>{

    dispatch({type:'LOADING', payload:true})
    try{
        const response = await axios.get('/api/users/getallusers')
        dispatch({type:'GET_ALL_USERS',payload:response.data})
        dispatch({type:'LOADING', payload:false})
    }catch(error){
        console.log(error)
        dispatch({type:'LOADING', payload:false})
    }

}
  