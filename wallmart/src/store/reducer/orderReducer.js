import * as actionType from '../action/actionTypes'; 


export const orderReducer = (state={},action)=>{
    switch(action.type)
    {
        case actionType.SET_ORDER_REQUEST:
            return{
                ...state,
                loading: true
            }
        case actionType.SET_ORDER_SUCCESS:
            return{
                ...state,
                loading: false,
                success: true,
                order:action.payload
            }
        case actionType.SET_ORDER_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
            case actionType.RESET_ORDER_SUCCESS:
            return{
            }
        default:
            return state;
    }
}

export const orderDetail = (state = { orderItems:[],loading:true,shippingAddress:{}},action)=>{
    switch(action.type){
        case actionType.GET_ORDER_REQUEST:
            return{
                ...state,
                loading:true
            }
        case actionType.GET_ORDER_SUCCESS:
            return{
                ...state,
                loading: false,
                order: action.payload
            }
        case actionType.GET_ORDER_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case actionType.RESET_ORDER_DETAIL:
            return{
                orderItems:[],loading:true,shippingAddress:{} 
            }
        default:
            return state;
    }
}

export const orderPay = (state= {},action)=>{
    switch(action.type)
    {
        case actionType.SET_PAY_REQUEST:
            return{
                loading:true
            }
        case actionType.SET_PAY_SUCCESS:
            return{
                loading:false,
                success:true
            }
        case actionType.SET_PAY_FAIL:
            return{
             loading:false,
             error: action.payload
            }
        case actionType.ORDER_PAY_RESET:
            return{
                
            }
        default:
            return state;
    }
}

export const myOrder = (state = {orders:[],loading:true},action)=>{
    switch(action.type){
        case actionType.GET_MY_ORDER_REQUEST:
            return{
                ...state,
                loading: true
            }
        case actionType.GET_MY_ORDER_SUCCESS:
            return{
                ...state,
                loading:false,
                orders:action.payload
            }
        case actionType.GET_MY_ORDER_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case actionType.RESET_ORDER:
            return{
                orders:[]
            }
        default:
            return state;
    }
}


export const getOrders = (state={orders:[]},action)=>{
    switch(action.type)
    {
        case actionType.GET_ORDERS_REQUEST:
            return{
                loading: true
            }
        case actionType.GET_ORDERS_SUCCESS:
            return{
                loading: false,
                orders: action.payload
            }
        case actionType.GET_ORDERS_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default:
                return state;
    }
} 

export const orderDeliver = (state= {},action)=>{
    switch(action.type)
    {
       
        case actionType.ORDER_DELIVER_SUCCESS:
            return{
              
                success: true
            }
        case actionType.ORDER_DELIVER_FAIL:
            return{
              
                error: action.payload
            }
        case actionType.ORDER_DELIVER_RESET:
            return {}
        default: 
            return state;
    }
}