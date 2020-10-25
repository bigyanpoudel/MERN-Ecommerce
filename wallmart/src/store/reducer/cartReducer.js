import * as actionType from '../action/actionTypes';
const initialState = {
    cartItems:[],
    shippingAddress:{},
    paymentMethod:''
}

const cartReducer = (state=initialState,action)=>{
    switch(action.type)
    {
        case actionType.ADD_TO_CART:
            const item = action.payload;
            console.log(item);
            const existItem = state.cartItems.find(x => x.product === item.product);
            console.log(state.cartItems);
            if(existItem)
            {
                debugger;
                return{
                    ...state,
                    cartItems: state.cartItems.map(x=> x.product === item.product ? item : x)
                }
            }else{
                debugger;
                return{
                    ...state,
                    cartItems: [...state.cartItems,item]
                }
            }
        case actionType.REMOVE_FROM_CART:
            return{
                ...state,
                cartItems: state.cartItems.filter(x=> x.product !== action.payload)
            }
        case actionType.SET_SHIPPING_ADDRESS:
            return{
                ...state,
                shippingAddress:action.payload
            }
        case actionType.SET_PAYMENT_METHOD:
            return{
                ...state,
                paymentMethod:action.payload
            }
        case actionType.RESET_CART_ITEM:
            return{
                ...state,
                cartItems:[]
            }
        default:
            return state;
    }
}

export default cartReducer;