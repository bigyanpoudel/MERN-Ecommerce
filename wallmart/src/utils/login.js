import {isEmpty} from './isEmpty';
import Validator from 'validator'
export const loginValidation = (data)=>{
    let error={};
     data.email = !isEmpty(data.email) ? data.email : '';
     data.password = !isEmpty(data.password) ? data.password : ' '
    if(!Validator.isEmail(data.email))
    {
        error.email =" Email  is not valid"
    }
    if(Validator.isEmpty(data.email))
    {
        error.email = "Email cannot be empty"
    }
    if(Validator.isEmpty(data.password))
    {
        error.password = "Password cannot be empty"
    }
    return{
        error,
        isValid: isEmpty(error)
    }
    }