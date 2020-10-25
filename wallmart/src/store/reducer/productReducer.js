import * as actionType from '../action/actionTypes';
const initialState = {
    loading:false,
    products: [],
    error: null,
    product: { reviews:[]}
}

export const productReducer = (state=initialState,action)=>{
    switch(action.type)
    {
        case actionType.SET_LOADING:
            return{
                ...state,
                loading: true
            }
        case actionType.SET_PRODUCTS:
            return{
                ...state,
                loading:false,
                products: action.payload
            }
            case actionType.SET_PRODUCTS_FAIL:
                return{
                    ...state,
                    loading:false,
                    error: action.payload
                }
        case actionType.SET_PRODUCT:
            return{
                ...state,
                loading: false,
                product: action.payload
            }
            case actionType.SET_PRODUCT_FAIL:
                return{
                    ...state,
                    loading:false,
                    error: action.payload
                }
        case actionType.DELETE_PRODUCT_REQUEST:
            return{
                ...state
            }
        case actionType.DELETE_PRODUCT_SUCCESS:
            return{
                ...state,
                success: true
            }
        case actionType.DELETE_PRODUCT_FAIL:
            return{
                ...state,
                error: action.payload
            }
        case actionType.DELETE_PRODUCT_RESET:
            return{
            ...state,
            success: false
        }
        case actionType.PRODUCT_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }
        case actionType.PRODUCT_REVIEW_SUCCESS:
            return{
                ...state,
                reviewSuccess: true
            }
        case actionType.PRODUCT_REVIEW_FAIL:
            return {
                ...state,
                reviewError: action.payload
            }
        case actionType.PRODUCT_REVIEW_RESET:
            return{
                ...state,
                reviewSuccess: false
            }
        default:
            return state;
    }
}


export const product = (state ={},action)=>{
    switch(action.type)
    {
        case actionType.CREATE_PRODUCT_REQUEST:
            return{
                loading: true
            }
        case actionType.CREATE_PRODUCT_SUCCESS:
            return{
                loading: false,
                success: true,
                createdProduct: action.payload
            }
        case actionType.CREATE_PRODUCT_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case actionType.CREATE_PRODUCT_RESET:
            return{}
        default:
            return state;
    }
} 

export const updateProduct = (state = {},action)=>{
    switch(action.type)
    {
        case actionType.UPDATE_PRODUCT_REQUEST:
            return{
                loading:true
            }
        case actionType.UPDATE_PRODUCT_SUCCESS:
            return{
                loading: false,
                success: true
            }
        case actionType.UPDATE_PRODUCT_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case actionType.UPDATE_PRODUCT_RESET:
            return{}
        default:
            return state;
    }
}

