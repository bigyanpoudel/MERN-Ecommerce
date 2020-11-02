import React,{useEffect,useLayoutEffect} from 'react'
import {Row,Col,Container,Button,Table} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import {getMyOrder} from '../store/action/actionCreator';
import Loader from '../component/Loader'; 
import Message from '../component/Message';
import {Link} from 'react-router-dom';

const MyOrder = ({history}) => {
    const {auth,myOrderDetail} = useSelector(state=>{
        return{
            auth:state.auth,
            myOrderDetail : state.myOrderDetail
        }
    });
   
    const {loading,error,orders}=myOrderDetail;
    const dispatch = useDispatch();
    useLayoutEffect(()=>{
        dispatch(getMyOrder());
    },[dispatch])
    useEffect(()=>{
        if(!auth.isAuthenticated)
        {
            history.push('/signin');
        }
        },[auth,history])
    return (
        <Container>
                <Row className="justify-content-md-center">
                <Col xs={12} md={9} >
               {loading ? (<Loader/>) : error ? (<Message>{error}</Message>) :
                 <Table striped hover bordered responsive className="table-sm">
                     <thead>
                         <tr>
                         <th>ID</th>
                         <th>DATE</th>
                         <th>TOTAL</th>
                         <th>PAID</th>
                         <th>DELIVERED</th>
                         <th>Detail</th>
                         </tr>
                     </thead>
                     <tbody>
                         {
                             orders && orders.map(order=>
                                 <tr key={order._id}>
                                    <td>{order._id}</td>
                             <td>{order.createdAt.substring(0,10)}</td>
                             <td>{order.totalPrice}</td>
                             <td>{order.isPaid ?
                             ( order.paidAt.substring(0,10)):
                             <i className="fas fa-times" style={{color:'red'}}></i>}</td>
                             <td>
                                 {order.isDelivered ?
                                 (order.deliveredAt.substring(0,10)):
                                 <i className="fas fa-times" style={{color:'red'}}/> }
                             </td>
                             <td>
                                 <Link to={`/order/${order._id}`}>
                                     <Button variant="light">Detail</Button>
                                 </Link>
                             </td>

                                 </tr>

                             )
                         }
                     </tbody>
                 </Table> 
               }


                </Col>
            </Row>
                
            
            
        </Container>
        
    )
}

export default MyOrder;
