import React,{useEffect,useState} from 'react'
import {Container,Button,Table} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import {getAllOrders} from '../store/action/actionCreator';
import Loader from '../component/Loader'; 
import Message from '../component/Message';
import {LinkContainer} from 'react-router-bootstrap';
import {Redirect} from 'react-router-dom';
import {isEmpty} from '../utils/isEmpty';
const AdminOrders = ({history}) => {
    const {auth,getOrders} = useSelector(state=>{
        return{
            auth:state.auth,
            getOrders: state.getOrders
        }
    });
    const [redirect,setRedirect] = useState(false);
    const {loading,error,orders}=getOrders;
    const {isAuthenticated,userInfo}= auth;
    const dispatch = useDispatch();
    useEffect(()=>{
       if(isAuthenticated && userInfo.isAdmin)
       {
         dispatch(getAllOrders());
       }else{
           setRedirect(true);
       }
     
        },[dispatch,isAuthenticated,userInfo]);
        if(redirect)
        {
            return <Redirect to={`/signin`}/>
        }


    return (
        <Container>
            <h1>Users Orders</h1>
               {loading ? (<Loader/>) : error ? (<Message>{error}</Message>) :
                 <Table striped hover bordered responsive className="table-sm">
                     <thead>
                         <tr>
                         <th>ID</th>
                         <th>User</th>
                         <th>Date</th>
                         <th>Total Price</th>
                         <th>Paid</th>
                         <th>Delivered</th>
                         <th>Action</th>
                         </tr>
                     </thead>
                     <tbody>
                         {
                            !isEmpty(orders) && orders.map(order=>
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user && order.user.name}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ?
                                            order.paidAt.substring(0,10)
                                        :
                                        <i className="fas fa-times"  style={{color:'red'}}/>
                                    }
                                    </td>
                                    <td>
                                        {order.isDelivered ?
                                            order.deliveredAt.substring(0,10)
                                        :
                                        <i className="fas fa-times"  style={{color:'red'}}/>
                                    }
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className="btn-sm" variant="light">Detail</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                                )

                         }
                    </tbody>
                    
                   
                 </Table> 
               }
        </Container>
        
    )
}

export default AdminOrders;
