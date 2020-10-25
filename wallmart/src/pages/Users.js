import React,{useEffect,useState} from 'react'
import {Row,Col,Container,Button,Table} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import {getUserList,deleteUser} from '../store/action/actionCreator';
import Loader from '../component/Loader'; 
import Message from '../component/Message';
import {LinkContainer} from 'react-router-bootstrap';
import {Link,Redirect} from 'react-router-dom';
import {isEmpty} from '../utils/isEmpty';
const Users = ({history}) => {
    const {auth,userList} = useSelector(state=>{
        return{
            auth:state.auth,
            userList: state.userList
        }
    });
    const [redirect,setRedirect] = useState(false);
    const {loading,error,users,success}=userList;
    const {isAuthenticated,userInfo}= auth;
    const dispatch = useDispatch();
    useEffect(()=>{
       if(isAuthenticated && userInfo.isAdmin)
       {
         dispatch(getUserList());
       }else{
           setRedirect(true);
       }
     
        },[dispatch,history,isAuthenticated,userInfo,success]);
if(redirect)
{
    return <Redirect to={`/signin`}/>
}

    const deleteHandler = (id,e)=>{
        e.preventDefault();
        console.log(id);
      
        dispatch(deleteUser(id));
    }
    return (
        <Container>
                <Row className="justify-content-md-center">
                <Col xs={12} md={9} >
               {loading ? (<Loader/>) : error ? (<Message>{error}</Message>) :
                 <Table striped hover bordered responsive className="table-sm">
                     <thead>
                         <tr>
                         <th>ID</th>
                         <th>Name</th>
                         <th>Email</th>
                         <th>isAdmin</th>
                         <th>Action</th>
                         </tr>
                     </thead>
                     <tbody>
                         {
                            !isEmpty(users) && users.map(user=>
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td><Link to={`mailto:${user.email}`}>{user.email}</Link></td>
                                    <td>
                                        {user.isAdmin ?
                                        <i className="fas fa-check" style={{color:'green'}}/>
                                        :
                                        <i className="fas fa-times"  style={{color:'red'}}/>
                                    }
                                    </td>
                                    <td>
                                        <LinkContainer to={`/user/${user._id}/edit`}>
                                            <Button className="btn-sm" variant="light"><i className="fas fa-edit"/></Button>
                                        </LinkContainer>
                                        <Button variant="danger" className="btn-sm ml-1" onClick={(e)=> deleteHandler(user._id,e)}>
                                            <i className="fas fa-trash"/>
                                        </Button>

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

export default Users;
