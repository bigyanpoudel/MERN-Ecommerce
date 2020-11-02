import React,{useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Col,Button,Form} from 'react-bootstrap';
import  {addPaymentMethod} from '../store/action/actionCreator';
import FormContainer from '../component/FormContainer';
import CheckoutProcess from '../component/CheckoutProcess';
const Payment = ({history}) => {
    const cart = useSelector(state=> state.cart)
    const {shippingAddress} = cart;
    const [paymentMethod,setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();
    if(!shippingAddress)
    {
        history.push('/shipping');
    }
    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(addPaymentMethod(paymentMethod));
        history.push('/placeorder');
    }
    return (
        <FormContainer>
            <CheckoutProcess step1 step2 step3/>
            <h1> Payment </h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label as="legend">Select Method</Form.Label>
                </Form.Group>
                <Col>
                     <Form.Check type="radio"
                     label="PayPal or credit card"
                     id="PayPal"
                     name="paymentMethod"
                     value={paymentMethod}
                     checked
                     onChange={(e)=> setPaymentMethod(e.target.value)}/>
                </Col>
               
                <Button variant="primary" type="submit">Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default Payment;
