import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {Button,Form} from 'react-bootstrap';
import Message from '../component/Message';
import Loader from '../component/Loader';
import  {getUserById,updateUser} from '../store/action/actionCreator';
import FormContainer from '../component/FormContainer';
import {PUT_USER_RESET} from '../store/action/actionTypes';
const EditUser = ({match,history}) => {
    const userId = match.params.id;
    const [user,setUser]=useState({
        email:'',
        name:'',
        isAdmin:false
    });
   
    const userDetail= useSelector(state=> state.userDetail);
    const dispatch = useDispatch();
    const { loading,error,user : userData,success} = userDetail;
    console.log(success);
    useEffect(()=>{
        debugger;
        if(success)
        {
            dispatch({type: PUT_USER_RESET});
            history.push('/admin/users');
        }else{
        if(!userData || userData._id !== userId)
        {
            dispatch(getUserById(userId));
        }else{
            setUser({
               
                email: userData.email,
                name: userData.name,
                isAdmin: userData.isAdmin
            })
        }
    }
    },[dispatch,userId,userData,setUser,success,history])
console.log(user);
    const submitHandler = (e)=>{
        e.preventDefault();
        console.log(user);
        debugger;
        dispatch(updateUser({id: userData._id, user}));
    }
    const ChangeHandler = (e)=>{
        const {name,value} = e.target;
        setUser({...user,[name]:value});
        
    }
    return (
       <>
       <Link to='/admin/users'>
        <Button className="btn btn-light">Go Back</Button>
       </Link>
        <FormContainer>
           
            <h1>Edit User</h1>
            {
                loading ? <Loader/> : error ? <Message variant="danger">{error}</Message>: 
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                    <Form.Label>Enter name</Form.Label>
                    <Form.Control type='text' name="name"
                    placeholder="enter name" value={user.name} onChange={ChangeHandler}/>
               
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Enter a email</Form.Label>
                    <Form.Control type="email" name="email" 
                    placeholder="enter email" value={user.email} onChange={ChangeHandler}/>
                  
                </Form.Group>
                 <Form.Group controlId='isAdmin'>
                    <Form.Check type="checkbox" label="Is admin" checked={user.isAdmin}
                    onChange={(e)=> setUser({...user,isAdmin: e.target.checked})}/>
                </Form.Group>
                <Button type="submit" className="btn btn-Success py-2 rounded">Update User</Button>
                </Form>
            }
            </FormContainer>
        </>
    )
}

export default EditUser;
