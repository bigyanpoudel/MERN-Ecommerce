import * as actionType from './actionTypes';
import axios from 'axios';
import setAuthHeader from '../../utils/setAuthHeader';

export const addToCart = (id,qty)=> async(dispatch,getState)=>{
    try{
        
        const res = await axios.get(`/api/products/${id}`);
        const {product} = res.data;
        console.log(res.data)
        const item = {
            product: product._id,
            name: product.name,
            image:product.image,
            price:product.price,
            countInStock: product.countInStock,
            qty
        }
        console.log(item);
        dispatch({
            type:actionType.ADD_TO_CART,
            payload:item
        });
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    }catch(err){
        console.log(err.response);
        
    }
}

export const removeFromCart = (id) => (dispatch,getState)=>{
    dispatch({
        type:actionType.REMOVE_FROM_CART,
        payload: id
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const addShippingAddress = (data)=> dispatch=>{
    dispatch({
        type: actionType.SET_SHIPPING_ADDRESS,
        payload:data
    })
    
    localStorage.setItem('shipping', JSON.stringify(data));
}
export const addPaymentMethod = (data)=> dispatch=>{
    dispatch({
        type: actionType.SET_PAYMENT_METHOD,
        payload:data
    })
    
    localStorage.setItem('payment', data);
}



export const setAuth = (data) => {
    return{
        type: actionType.SET_AUTH,
        payload: data
    }
}
export const userLogin = (loginInfo)=> async (dispatch)=>{
    try{
        dispatch({
            type: actionType.USER_LOGIN_REQUEST
        });
        debugger;
       
        const res = await axios.post('api/v1/login',loginInfo);
        console.log(res.data);
        setAuthHeader('Bearer ' + res.data.token);
        dispatch(setAuth(res.data));
        localStorage.setItem('user', JSON.stringify(res.data));
    }catch(err){
        console.log(err.message);
        console.log(err.response.message)
        dispatch({
            type:actionType.SET_ERROR,
            payload: err.response && err.response.data.message ? 
                    err.response.data.message :err.message
        })
    }
}

export const userRegister = (user,history)=> async(dispatch)=>{
    try{
        dispatch({
            type:actionType.USER_REGISTER_REQUEST
        });
       
        await axios.post('api/v1/register',user);
        dispatch({
            type: actionType.USER_REGISTER_SUCCESS
        });
         history.push('/signin');
    }catch(err){
        console.log(err.message);
        console.log(err.response.message)
        dispatch({
            type:actionType.SET_ERROR,
            payload: err.response && err.response.data.message ? 
                    err.response.data.message :err.message
        })
    }
}

export const getProfile = ()=> async(dispatch) =>{
try{
    dispatch({
        type:actionType.SET_PROFILE_LOADING
    });
    debugger;
    const res = await axios.get('/api/v1/profile');
    console.log(res.data);
    
    dispatch({
        type:actionType.SET_PROFILE,
        payload: res.data
    })
}catch(err){
    console.log(err.message);
    dispatch({
        type:actionType.SET_PROFILE_ERROR,
        payload: err.response && err.response.data.message ? 
                err.response.data.message :err.message
    })
}
}

export const addOrder = (data)=> async(dispatch)=>{
    try{
        dispatch({
            type:actionType.SET_ORDER_REQUEST
        });
        const res = await axios.post('api/v1/order',data);
        console.log(res.data);
        dispatch({
            type:actionType.SET_ORDER_SUCCESS,
            payload:res.data
        });
        dispatch({
            type: actionType.RESET_CART_ITEM
        })
        localStorage.removeItem('cartItems');
    }catch(err){
        console.log(err.response.message);
        dispatch({
            type:actionType.SET_ORDER_FAIL,
            payload: err.response && err.response.data.message ? 
                    err.response.data.message :err.message
        })
    }
}
export const getOrderById = (id)=> async(dispatch)=>{
    try{
        dispatch({
            type: actionType.GET_ORDER_REQUEST
        });
        
        const res = await axios.get(`/api/v1/order/${id}`);
        console.log(res.data);
        dispatch({
            type: actionType.GET_ORDER_SUCCESS,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type:actionType.GET_ORDER_FAIL,
            payload: err.response && err.response.data.message ? 
                    err.response.data.message :err.message
        })
    }
}
export const addOrderPay = (id,data)=> async(dispatch)=>{
try{
    dispatch({
        type: actionType.SET_PAY_REQUEST
    });
     await axios.put(`/api/v1/order/${id}/pay`,data);
    dispatch(
        {
        type: actionType.SET_PAY_SUCCESS
        }
    );
 
}catch(err){
    dispatch({
        type:actionType.SET_PAY_FAIL,
        payload: err.response && err.response.data.message ? 
                err.response.data.message :err.message
    })
}
}

export const getMyOrder = ()=> async(dispatch)=>{
    try{
        dispatch({
            type:actionType.GET_MY_ORDER_REQUEST
        });
      
        const res = await axios.get('/api/v1/order/myorders');
        console.log(res.data);
        dispatch({
            type:actionType.GET_MY_ORDER_SUCCESS,
            payload:res.data
        });
    }catch(err){
        dispatch({
            type:actionType.GET_MY_ORDER_FAIL,
            payload: err.response && err.response.data.message ? 
                    err.response.data.message :err.message
        })
    }
}

export const getUserList = ()=> async(dispatch) =>{
    try{
        dispatch({
            type:actionType.USER_LIST_REQUEST
        });
      
        const res = await axios.get('/api/v1/');
        console.log(res.data);
        
        dispatch({
            type:actionType.USER_LIST_SUCCESS,
            payload: res.data
        })
    }catch(err){
        console.log(err.message);
        dispatch({
            type:actionType.USER_LIST_FAIL,
            payload: err.response && err.response.data.message ? 
                    err.response.data.message :err.message
        })
    }
    }

    export const deleteUser = (id)=> async(dispatch)=>{
        try{
            dispatch({
                type: actionType.USER_DELETE_REQUEST
            })
            await axios.delete(`/api/v1/${id}`);
            dispatch({
                type: actionType.USER_DELETE_SUCCESS
            })
        }catch(err){
            dispatch({
                type:actionType.USER_DELETE_FAIL,
                payload: err.response && err.response.data.message ? 
                        err.response.data.message :err.message
            })
        }
    }
export const getUserById =(id)=>async(dispatch)=>{
    try{
        dispatch({
            type: actionType.GET_USER_REQUEST
        })
        const res = await axios.get(`/api/v1/${id}`);
        dispatch({
            type: actionType.GET_USER_SUCCESS,
            payload: res.data
        })
    }catch(err){
        dispatch({
            type:actionType.GET_USER_FAIL,
            payload: err.response && err.response.data.message ? 
                    err.response.data.message :err.message
        })
    }
}
export const updateUser =(data)=>async(dispatch)=>{
    try{
        dispatch({
            type: actionType.PUT_USER_REQUEST
        })
        console.log(data);
        debugger;
        const res = await axios.put(`/api/v1/${data.id}`,data.user);
        console.log(res.data);
        dispatch({
            type: actionType.PUT_USER_SUCCESS
        })
        debugger;
    }catch(err){
        dispatch({
            type:actionType.PUT_USER_FAIL,
            payload: err.response && err.response.data.message ? 
                    err.response.data.message :err.message
        })
    }
}

export const getAllOrders = ()=>async(dispatch)=>{
    try{
        dispatch({
            type: actionType.GET_ORDERS_REQUEST
        })
        debugger;
        const res = await axios.get('/api/v1/order/all');
        console.log(res.data);
        dispatch({
            type: actionType.GET_ORDERS_SUCCESS,
            payload: res.data
        })
    }catch(err){
        dispatch({
            type:actionType.GET_ORDERS_FAIL,
            payload: err.response && err.response.data.message ? 
                    err.response.data.message :err.message
        })
    }
}


export const orderDelivered = (data)=>async(dispatch)=>{
    try{
        await axios.put(`/api/v1/order/${data._id}/deliver`);
        dispatch({
            type: actionType.ORDER_DELIVER_SUCCESS
        })
    }catch(err){
        dispatch({
            type:actionType.ORDER_DELIVER_FAIL,
            payload: err.response && err.response.data.message ? 
                    err.response.data.message :err.message
        })
    }
}
export const logout = ()=> dispatch=>{
    localStorage.removeItem('user');
    dispatch({
        type: actionType.USER_LOGOUT
    });
    dispatch({
        type: actionType.RESET_ORDER
    });
    dispatch({
        type: actionType.USER_LIST_RESET
    })
}

