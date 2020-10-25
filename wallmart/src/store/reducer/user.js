import * as actionType from '../action/actionTypes';
export const userList = (state = { users:[]},action)=>{
    switch(action.type){
        case actionType.USER_LIST_REQUEST:
            return{
                ...state,
                loading: true
            }
        case actionType.USER_LIST_SUCCESS:
            return{
                ...state,
                loading: false,
                users: action.payload
            }
        case actionType.USER_LIST_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case actionType.USER_LIST_RESET:
            return{
                user:[]
            }
        case actionType.USER_DELETE_REQUEST:
            return{
                ...state,
                loading: true
            }
        case actionType.USER_DELETE_SUCCESS:
            return{
                ...state,
                success: true,
                loading: false
            }
        case actionType.USER_DELETE_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        
        default:
            return state;
    }
}
export const userDetail = (state={user:null},action)=>{
    switch(action.type)
    {
        case actionType.GET_USER_REQUEST:
            return{
                ...state,
                loading: true
            }
        case actionType.GET_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                user: action.payload
            }
        case actionType.GET_USER_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case actionType.PUT_USER_REQUEST:
            console.log("loading");
            return{
                ...state,
                loading: true
            }
        case actionType.PUT_USER_SUCCESS:
            console.log("succeess");
            return{
                ...state,
                loading: false,
                success: true
            }
        case actionType.PUT_USER_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case actionType.PUT_USER_RESET:
            return{
                user: null
            }
        default:
            return state;
    }
}