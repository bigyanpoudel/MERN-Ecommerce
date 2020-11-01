import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {Row,Col,Button,Form} from 'react-bootstrap';
import Message from '../component/Message';
import Loader from '../component/Loader';
import  {userLogin} from '../store/action/actionCreator';
import FormContainer from '../component/FormContainer';
import {loginValidation} from '../utils/login';
const Login = ({location,history}) => {
    const [user,setUser]=useState({
        email:'',
        password:''
    });
    const redirect = location.search ? location.search.split('=')[1] : '/';
    console.log(redirect);
    const [errors,setErrors] = useState({});
    const auth = useSelector(state=> state.auth);
    const dispatch = useDispatch();
    const submitHandler = (e)=>{
        e.preventDefault();
        const {error,isValid} = loginValidation(user);
        console.log(isValid);
        if(!isValid)
        {
            console.log(error);
            setErrors(error);
        }else{
        dispatch(userLogin(user));
        setErrors({});
        }
    }
    const ChangeHandler = (e)=>{
        const {name,value} = e.target;
        setUser({...user,[name]:value});
    }
    const {error,isAuthenticated,loading} = auth;
    useEffect(()=>{
        if(isAuthenticated)
        {
            history.push(redirect);
        }
    },[history,redirect,isAuthenticated])
    return (
        <FormContainer>
            {loading ? <Loader/> :
            <>
             <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            
            <Form onSubmit={submitHandler}>
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
                    New Customer ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Link>
                </Col>
            </Row>
            
            </>
    }
        </FormContainer>
    )
}

export default Login;
