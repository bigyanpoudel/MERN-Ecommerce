import React,{useState,useEffect,useLayoutEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Row,Col,Card,ListGroup,Container,Image,Button} from 'react-bootstrap';
import  {getOrderById,addOrderPay,orderDelivered} from '../store/action/actionCreator';
import Message from '../component/Message';
import Loader from '../component/Loader';
import {PayPalButton} from 'react-paypal-button-v2';
import {ORDER_PAY_RESET,RESET_ORDER_DETAIL,ORDER_DELIVER_RESET} from '../store/action/actionTypes';
const Order = ({history,match}) => {
    const dispatch = useDispatch();
    const orderId = match.params.id;
    const orderDetail = useSelector(state=> state.orderDetail);
    const {loading,error,order} = orderDetail;
    const [SDKReady,setSDKReady] = useState(false);
    const orderPay = useSelector(state => state.orderPay);
    const {loading : payLoading , success : paySuccess} = orderPay;
    const orderDeliver = useSelector(state => state.orderDeliver);
    const {loading : deliverLoading, success : deliverSuccess, error : deliverError} = orderDeliver;
    const auth = useSelector(state => state.auth);
    const {userInfo}= auth;
    useLayoutEffect(()=>{
        
        dispatch({type: RESET_ORDER_DETAIL});
    },[dispatch])
    useEffect(()=>{
        const addPayPalScript = async()=>{
            try{const res = await axios.get('/api/v1/config/paypal');
            const script = document.createElement('script');
            script.type='text/javascript';
            script.src=`https://www.paypal.com/sdk/js?client-id=${res.data}`;
            script.async= true;
            script.onload = ()=>{
                setSDKReady(true);
            }
            document.body.appendChild(script);
        }catch(err){
            console.log(err.response);
            console.log(err.message);
        }
        }
        if(!order || paySuccess || deliverSuccess)
        { 
            dispatch({type: ORDER_DELIVER_RESET});
            dispatch({type: ORDER_PAY_RESET});
            dispatch(getOrderById(orderId));
        }else if(!order.isPaid){
            if(!window.paypal)
            {
                addPayPalScript();
            }else{
                setSDKReady(true);
            }
        }
        
    },[dispatch,orderId,order,paySuccess,loading,deliverSuccess]);
    const paymentSuccessHandler = (paymentResult)=>{
        console.log(paymentResult);
        dispatch(addOrderPay(order._id,paymentResult));
    } 
    const orderDeliverHandler = (event)=>{
        event.preventDefault();
        dispatch(orderDelivered(order));
    }
return(
loading || deliverLoading ? <Loader/> : (error ? <Message>{error}</Message>:
    <Container>
        <h1>Order {order._id}</h1>
        {deliverError && <Message variant="danger">{deliverError}</Message>}
        <Row className="my-2">
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name:</strong>
                                {order.user.name}
                            </p>
                            <p>
                                <strong>Email:</strong>
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                            <strong>Address:</strong>
                            {order.shippingAddress.address}{' '},{order.shippingAddress.city}{' '}, 
                            {order.shippingAddress.postalCode}{' '}, {order.shippingAddress.country}
                            </p>
                            <div>
                                {order.isDelivered ? <Message>Delivered at {order.DeliveredAt}</Message>:
                                (<Message variant="danger">Not Delivered</Message>)}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment</h2>
                            <p>
                                <strong>Method:</strong>
                                {order.paymentMethod}
                            </p>
                            <div>
                                {order.isPaid ? <Message>Paid at {order.paidAt}</Message>:
                                (<Message variant="danger">Not Paid</Message>)}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {
                                order.orderItems.length === 0 ? <Message>Your cart is empty</Message>:
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item,index)=>
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
                                    <Col>$ {order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping Price</Col>
                                     <Col>$ {order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax Price</Col>
                                    <Col>${order.taxPrice} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price</Col>
                                    <Col>${order.totalPrice} </Col>
                                </Row>
                            </ListGroup.Item>
                            { !order.isPaid &&
                            <ListGroup.Item>
                                {payLoading && <Loader/>}
                                {!SDKReady ? <Loader/>:
                                <PayPalButton  amount={order.totalPrice} onSuccess={paymentSuccessHandler}/> }
                            </ListGroup.Item>
                            }
                            {
                                userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button type="button" className="btn btn-warning" onClick={orderDeliverHandler}>
                                            Mark as Deliver
                                        </Button>
                                    </ListGroup.Item>
                                )
                            }
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    </Container>)
)
        
}

export default Order;
