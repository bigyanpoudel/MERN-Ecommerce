import {isEmpty} from './isEmpty';
import Validator from 'validator'
export const registerValidation = (data)=>{
    let error={};
    data.name = !isEmpty(data.name) ? data.name : '';
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
   
    if(Validator.isEmpty(data.name))
    {
        error.name = "Name cannot be empty"
    }
    return{
        error,
        isValid: isEmpty(error)
    }
    }