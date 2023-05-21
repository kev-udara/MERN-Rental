import { message } from 'antd';
import axios from 'axios';


export const getAllAccessories=()=>async dispatch=>{

    dispatch({type:'LOADING', payload:true})
    try{
        const response = await axios.get('/api/accessories/getallaccessories')
        dispatch({type:'GET_ALL_ACCESSORIES',payload:response.data})
        dispatch({type:'LOADING', payload:false})
    }catch(error){
        console.log(error)
        dispatch({type:'LOADING', payload:false})
    }

}

export const addAccessory=(reqObj)=>async dispatch=>{
    dispatch({type:'LOADING', payload:true})
    try{
        await axios.post('/api/accessories/addaccessory', reqObj)

        dispatch({type:'LOADING', payload:false})
        message.success('New accessory added successfully')
        setTimeout(()=>{
          window.location.href='/adminaccessory'
        },500);
    }catch(error){
        console.log(error)
        dispatch({type:'LOADING', payload:false})
    }
}

export const editAccessory=(reqObj)=>async dispatch=>{
    dispatch({type:'LOADING', payload:true})
    try{
        await axios.post('/api/accessories/editaccessory', reqObj)

        dispatch({type:'LOADING', payload:false})
        message.success('Accessory details updated successfully')
        setTimeout(()=>{
          window.location.href='/adminaccessory'
        },500);
    }catch(error){
        console.log(error)
        dispatch({type:'LOADING', payload:false})
    }
}

export const deleteAccessory=(reqObj)=>async dispatch=>{
    dispatch({type:'LOADING', payload:true})
    try{
        await axios.post('/api/cars/deleteaccessory', reqObj)
        dispatch({type:'LOADING', payload:false})
        message.success('Accessory deleted successfully')
        setTimeout(()=>{
          window.location.reload()
        },500);
    }catch(error){
        console.log(error)
        dispatch({type:'LOADING', payload:false})
    }
}