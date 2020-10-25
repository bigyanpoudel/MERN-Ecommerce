import axios from 'axios';

const setAuthHeader = (token)=>{
    console.log(token);
    if(token)
    {
        //apply to every user
        axios.defaults.headers.common['Authorization'] = token;
    }else{
        //delete auth header
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthHeader;
