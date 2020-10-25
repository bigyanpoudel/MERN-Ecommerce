import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Row,Col,Button,ListGroup,Form,Image,Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import  { addToCart,removeFromCart} from '../store/action/actionCreator'; 
import Message from '../component/Message';
const Cart = ({match,location,history}) => {
    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]):1;
    const dispatch = useDispatch();
    useEffect(()=>{
        if(productId)
        {
            dispatch(addToCart(productId,qty));
        }
    },[dispatch,productId,qty]);
    const {cart} = useSelector(state=>{
        return{
            cart: state.cart
        }});
    const removeFromCartHandler = (id,event)=>{
        console.log("remove");
       dispatch(removeFromCart(id))
    }
    const checkOutHandler = ()=>{
        history.push('/signin?redirect=shipping')
    }
    const {cartItems} = cart;
    return (
        <div>
            <Row>
            <Col md={8}>
                <h1>Your Shopping Cart</h1>
                { cartItems.length === 0 ? ( <Message>
                    Your cart is empty . <Link to='/'><Button className="btn btn-block">Go Back</Button></Link>
                </Message>):(
                     <ListGroup variant='flush'>
                         {
                        cartItems.map(item=>
                        
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${productId}`}>
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col col={2}>
                                            ${item.price}
                                        </Col>
                                        <Col md={3}>
                                            <Form.Control as="select"
                                            value={item.qty}
                                            onChange={(e)=> dispatch(addToCart(item.product,e.target.value))}>
                                                {
                                                    [...Array(item.countInStock).keys()].map(x=>
                                                    <option value={x + 1} key={x +1}>{x +1 }</option>
                                                    )
                                                }
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                                <Button type="submit"  variant="light" onClick={()=>removeFromCartHandler(item.product)}>
                                                    <i className="far fa-trash-alt"></i>
                                                </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            
                    )
                 }
                </ListGroup>
                )}
            </Col>
            <Col md={4}>
                 <Card>
                     <ListGroup variant="flush">
                         <ListGroup.Item>
                             <h1 style={{fontSize:"1.4rem"}}>subtotal ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                             ) Items</h1> 
                            ${cartItems.reduce((price,item) => price + Number(item.qty) *item.price,0).toFixed(2)}
                         </ListGroup.Item>
                         <ListGroup.Item className="display__flex justify-content-center">
                             <Button type="submit"
                             className="btn btn-dark"
                             disabled={cartItems.length === 0}
                             onClick={checkOutHandler}
                             >
                                 Proceed to checkout
                             </Button>
                         </ListGroup.Item>

                     </ListGroup>
                 </Card>
            
            </Col>
            </Row>
        </div>
    )
}

export default Cart;
