import * as actionType from '../action/actionTypes';
import {isEmpty} from '../../utils/isEmpty';
const initialState = {
    isAuthenticated: false,
    loading: false,
    userInfo:{}
}

const authReducer = (state=initialState,action)=>{
    switch(action.type)
    {
        case actionType.USER_LOGIN_REQUEST:
            return{
                ...state,
                loading: true
            }
            case actionType.USER_REGISTER_REQUEST:
                return{
                    ...state,
                    loading: true
                }
             case actionType.USER_REGISTER_SUCCESS:
                return{
                    ...state,
                    loading: false
                }
        case actionType.SET_AUTH:
            return{
                ...state,
                loading: false,
                isAuthenticated : !isEmpty(action.payload),
                userInfo:action.payload
               
            }
        case actionType.SET_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case actionType.USER_LOGOUT:
            return{
                ...state,
                isAuthenticated: false
            }
        default:
            return state;
    }
}

export default authReducer;