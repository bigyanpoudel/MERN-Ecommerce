import * as actionType from '../action/actionTypes';

const initialState = {
    profile:{}
}

const profileReducer = (state = initialState,action)=>{
    switch(action.type)
    {
        case actionType.SET_PROFILE_LOADING:
            return{
                ...state,
                loading:true
            }
            case actionType.SET_PROFILE:
                return{
                    ...state,
                    loading:false,
                    profile: action.payload
                }
            case actionType.SET_PROFILE_ERROR:
                return{
                    ...state,
                    loading:false,
                    error: action.payload
                }
            case actionType.RESET_PROFILE:
                return{
                    profile:{}
                }
        default:
            return state
    }
}

export default profileReducer;