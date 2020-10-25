import React,{useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Button,Form} from 'react-bootstrap';
import  {addShippingAddress} from '../store/action/actionCreator';
import FormContainer from '../component/FormContainer';
import CheckoutProcess from '../component/CheckoutProcess';
const Shipping = ({history}) => {
    const cart = useSelector(state=> state.cart)
    const {shippingAddress} = cart;
    const dispatch = useDispatch();
    const [shipping,setShipping] = useState({
        address:shippingAddress.address,
        city:shippingAddress.city,
        country:shippingAddress.country,
        postalCode:shippingAddress.postalCode
    });
    const ChangeHandler = (e)=>{
        const {name,value} = e.target;
        setShipping({...shipping, [name] : value});
    }
    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(addShippingAddress(shipping));
        history.push('/payment');
    }
    return (
        <FormContainer>
            <CheckoutProcess step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" 
                    placeholder="enter a address" value={shipping.address} onChange={ChangeHandler}/>
                  
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" name="city" 
                    placeholder="enter a city" value={shipping.city} onChange={ChangeHandler}/>
                  
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" name="country" 
                    placeholder="enter a country" value={shipping.country} onChange={ChangeHandler}/>
                  
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <Form.Label>postalCode</Form.Label>
                    <Form.Control type="text" name="postalCode" 
                    placeholder="enter a postal code" value={shipping.postalCode} onChange={ChangeHandler}/>
                  
                </Form.Group>
                <Button variant="primary" type="submit">Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default Shipping
