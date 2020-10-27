import axios from 'axios';
import * as actionType from './actionTypes';
export const getProducts = (keyword = '',pageNumber = '')=> async(dispatch)=>{
    try{  
        dispatch({
            type:actionType.SET_LOADING
        });
       
        const res = await axios.get(`/api/products/?keyword=${keyword}&pageNumber=${pageNumber}`);
        console.log(res.data);
        dispatch(
            {
                type: actionType.SET_PRODUCTS,
                payload: res.data
            }
        );
    }catch(err){
        console.log(err);
        dispatch({
            type:actionType.SET_PRODUCTS_FAIL,
            payload: err.response && err.response.data.message ? 
                    err.response.data.message :err.message
        })
    }
}

export const getProduct = (id)=> async(dispatch)=>{
    try{
        dispatch({
            type:actionType.SET_LOADING
        });
        
        const res = await axios.get(`/api/products/${id}`);
        dispatch(
            {
                type: actionType.SET_PRODUCT,
                payload: res.data.product
            }
        );
    }catch(err){
        console.log(err);
        dispatch({
            type:actionType.SET_PRODUCT_FAIL,
            payload: err.response && err.response.data.message ? 
                    err.response.data.message :err.message
        })
    }
}

export const deleteProduct = (id) =>  async(dispatch)=>{
    try{
        dispatch({
            type:actionType.DELETE_PRODUCT_REQUEST
        });
        await axios.delete(`/api/products/${id}`);
        dispatch(
            {
                type: actionType.DELETE_PRODUCT_SUCCESS
            }
        );
    }catch(err){
       
        dispatch({
            type:actionType.DELETE_PRODUCT_FAIL,
            payload: err.response && err.response.data.message ? 
                    err.response.data.message :err.message
        })
    }
}
export const createProduct = () =>  async(dispatch)=>{
    try{
        dispatch({
            type:actionType.CREATE_PRODUCT_REQUEST
        });
       
       const res = await axios.post(`/api/products/`);
        dispatch(
            {
                type: actionType.CREATE_PRODUCT_SUCCESS,
                payload: res.data
            }
        );
    }catch(err){
       
        dispatch({
            type:actionType.CREATE_PRODUCT_FAIL,
            payload: err.response && err.response.data.message ? 
                    err.response.data.message :err.message
        })
    }
}
export const updateProductById = (data) =>  async(dispatch)=>{
    try{
        dispatch({
            type:actionType.UPDATE_PRODUCT_REQUEST
        });
        
        console.log(data);
        await axios.put(`/api/products/${data.id}`,data.productData);
        dispatch(
            {
                type: actionType.UPDATE_PRODUCT_SUCCESS,
              
            }
        );
    }catch(err){
       
        dispatch({
            type:actionType.UPDATE_PRODUCT_FAIL,
            payload: err.response && err.response.data.message ? 
                    err.response.data.message :err.message
        })
    }
}

export const productReview =(id,review)=>  async(dispatch)=>{
    try{
        dispatch({
            type:actionType.PRODUCT_REVIEW_REQUEST
        });
        console.log(id);
        debugger;
        await axios.put(`/api/products/${id}/review`,review);
        dispatch(
            {
                type: actionType.PRODUCT_REVIEW_SUCCESS
              
            }
        );
    }catch(err){
       
        dispatch({
            type:actionType.PRODUCT_REVIEW_FAIL,
            payload: err.response && err.response.data.message ? 
                    err.response.data.message :err.message
        })
    }
}


export const getTopProduct =()=>  async(dispatch)=>{
    try{
        const res = await axios.get(`/api/products/top`);
        dispatch(
            {
                type: actionType.GET_TOP_PRODUCT_SUCCESS,
                 payload: res.data
            }
        );
    }catch(err){
       
        dispatch({
            type:actionType.GET_TOP_PRODUCT_FAIL,
            payload: err.response && err.response.data.message ? 
                    err.response.data.message :err.message
        })
    }
}

