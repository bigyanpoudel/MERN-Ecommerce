import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {Row,Col,Button,Card,ListGroup,Container,Image} from 'react-bootstrap';
import  {addOrder} from '../store/action/actionCreator';
import CheckoutProcess from '../component/CheckoutProcess';
import Message from '../component/Message';
import Loader from '../component/Loader';
import {RESET_ORDER_SUCCESS} from '../store/action/actionTypes';
const PlaceOrder = ({history}) => {
    const cart = useSelector(state=> state.cart)
    const {shippingAddress,cartItems,paymentMethod} = cart;
    const dispatch = useDispatch();

    if(!paymentMethod) 
    {
        history.push('/payment');
    }
    const orders = useSelector(state=> state.orders);
    const {loading,error,success,order} = orders;
    useEffect(()=>{
        if(success)
        {
           
            history.push(`/order/${order._id}`);
           
            dispatch({type:RESET_ORDER_SUCCESS});   
        }
    },[success,order,dispatch,history]);

    //calc order price
    const addDecimal = (num)=>{
        return Math.round((num*100)/100).toFixed(2);
    }
    const itemsPrice = addDecimal(cartItems.reduce((price,item)=> price + Number(item.price * item.qty),0 ))
    const shippingPrice = addDecimal(itemsPrice > 1000 ? 0 : 80);
    const taxPrice = addDecimal(Number((0.1* itemsPrice).toFixed(2)));
    const totalPrice = addDecimal(( Number(itemsPrice) + Number(shippingPrice) +Number(taxPrice)));
    //submitting oder
    const orderHandler = (e)=>{
        e.preventDefault();
        dispatch(addOrder({
            orderItems: cartItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        }));
        
    } 
    return (
        <Container>
            <CheckoutProcess step1 step2 step3 step4/>
            { loading ? <Loader/> :
            <>
            <Row className="my-2">
                <Col md={8}>
                <h1>Place Order</h1>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                            <strong>Address:</strong>
                            {shippingAddress.address}{' '},{shippingAddress.city}{' '}, 
                            {shippingAddress.postalCode}{' '}, {shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment</h2>
                            <p>
                                <strong>Method:</strong>
                                {paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {
                                cartItems.length === 0 ? <Message>Your cart is empty</Message>:
                                <ListGroup variant="flush">
                                    {cartItems.map((item,index)=>
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={3}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col className="d-flex  align-items-center">
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4} className="d-flex  align-items-center">
                                                    {item.qty} * $ {item.price} = $ {(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )
                                    }
                                </ListGroup>
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
               { error && <Card className="my-2"> <Message variant="danger">{error}</Message></Card>}
                    <Card className="mt-2">
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                Order Summary
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items Price</Col>
                                    <Col>$ {itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping Price</Col>
                                     <Col>$ {shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax Price</Col>
                                    <Col>${taxPrice} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price</Col>
                                    <Col>${totalPrice} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type="submit" className="btn btn-block"
                                disabled={cartItems === 0}
                                onClick={orderHandler}>Proceed Order</Button>
                            </ListGroup.Item>


                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            </>
            }
        </Container>
    )
}

export default PlaceOrder;
