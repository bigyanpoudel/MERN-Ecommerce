import React,{useState} from 'react';
import {Form,Button} from 'react-bootstrap';
const SearchBox = ({history}) => {
    const [keyword,setKeyword] =useState('');
    const searchHandler = (e)=>{
        e.preventDefault();
        if(keyword.trim())
        {
            history.push(`/search/${keyword}`);
        }else{
            history.push('/');
        }
    }
    return (
       
        <Form onSubmit={searchHandler} inline >
            <Form.Control type="text" name="q" placeholder="search products..."
             onChange={(e)=> setKeyword(e.target.value)}
             className="ml-sm-2 mr-sm-2"/>
             <Button type="submit" variant="outline-success" className="p-2">Search</Button>
        </Form>
        
    )
}

export default SearchBox;
