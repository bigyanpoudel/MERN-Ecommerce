import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
import {productReducer,product,updateProduct} from './reducer/productReducer';
import {orderReducer,orderDetail,orderPay,myOrder,getOrders,orderDeliver} from './reducer/orderReducer';
import authReducer from './reducer/authReducer';
import cartReducer from './reducer/cartReducer';
import thunk from 'redux-thunk';
import profileReducer from './reducer/profileReducer';
import setAuthHeader from '../utils/setAuthHeader';
import {userList,userDetail} from './reducer/user';
const rootReducer = combineReducers({
    auth: authReducer,
    orders: orderReducer,
    productList:productReducer,
    cart: cartReducer,
    userProfile: profileReducer,
    orderDetail: orderDetail,
    orderPay: orderPay,
    myOrderDetail:myOrder,
    userList : userList,
    userDetail: userDetail,
    product: product,
    updateProduct: updateProduct,
    getOrders: getOrders,
    orderDeliver : orderDeliver
});
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')):null;
const auth = user ? true : false
if(user)
{
    setAuthHeader('Bearer ' + user.token);
}
const shipping = localStorage.getItem('shipping') ? JSON.parse(localStorage.getItem('shipping')) : {};
const payment =localStorage.getItem('payment') ? localStorage.getItem('payment') : '';
const initialState={
    cart: { cartItems : cartItemsFromStorage, shippingAddress: shipping, paymentMethod:payment},
    auth:{ isAuthenticated : auth, userInfo:user}
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,initialState,composeEnhancers(applyMiddleware(thunk)));

export default store;