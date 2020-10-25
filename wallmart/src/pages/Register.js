import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {Row,Col,Button,Form} from 'react-bootstrap';
import Message from '../component/Message';
import Loader from '../component/Loader';
import  {userRegister} from '../store/action/actionCreator';
import FormContainer from '../component/FormContainer';
import {registerValidation} from '../utils/Register'; 
const Register = ({history}) => {
    const [user,setUser]=useState({
        email:'',
        password:'',
        name:''
    });
    const [errors,setErrors] = useState({});
    const auth = useSelector(state=> state.auth);
    const dispatch = useDispatch();
    const submitHandler = (e)=>{
        e.preventDefault();
        const {error,isValid} = registerValidation(user);
        console.log(isValid);
        if(!isValid)
        {
            console.log(error);
            setErrors(error);
        }else{
        dispatch(userRegister(user,history));
        setErrors({});
        }
    }
    const ChangeHandler = (e)=>{
        const {name,value} = e.target;
        setUser({...user,[name]:value});
    }
    const {error,loading} = auth;
    return (
        loading ? <Loader/> :
        <FormContainer>
            {error && <Message variant="danger">{error}</Message>}
            <h1>Create Account</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                    <Form.Label>Enter name</Form.Label>
                    <Form.Control type='text' name="name" className={errors.name && 'invalid'}
                    placeholder="enter name" value={user.name} onChange={ChangeHandler}/>
                   <div className="mt-2" style={{color:'red'}}>{errors.name}</div>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Enter a email</Form.Label>
                    <Form.Control type="email" name="email" className={errors.email && 'invalid'}
                    placeholder="enter email" value={user.email} onChange={ChangeHandler}/>
                   <div className="mt-2" style={{color:'red'}}>{errors.email}</div>
                </Form.Group>
                 <Form.Group controlId='password'>
                    <Form.Label>Enter a password</Form.Label>
                    <Form.Control type="password" name="password" className={errors.password && 'invalid'}
                     placeholder="enter password" value={user.password} onChange={ChangeHandler}/>
                    <div className="mt-2" style={{color:'red'}}>{errors.password}</div>
                </Form.Group>
                <Button type="submit" className="btn btn-dark py-2 rounded">Sign in</Button>
                </Form>
            <Row className="mt-3">
                <Col >
                    Already Customer ? <Link to="/signin">
                        Sign up
                    </Link>
                </Col>
            </Row>
        </FormContainer>
        
    )
}

export default Register;
