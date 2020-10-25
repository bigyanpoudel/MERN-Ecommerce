import React,{useEffect,useState} from 'react'
import {Row,Col,Container,Button,Table} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import {getProducts,deleteProduct,createProduct} from '../store/action/productActionCreator';
import Loader from '../component/Loader'; 
import Message from '../component/Message';
import {LinkContainer} from 'react-router-bootstrap';
import {Link,Redirect} from 'react-router-dom';
import {isEmpty} from '../utils/isEmpty';
import {CREATE_PRODUCT_RESET,UPDATE_PRODUCT_RESET} from '../store/action/actionTypes';
const Products = ({history}) => {
    const {auth,productList,product} = useSelector(state=>{
        return{
            auth:state.auth,
            productList: state.productList,
            product: state.product
        }
    });
  
    const [redirect,setRedirect] = useState(false);
    const {loading,error,products,success}=productList;
    const {isAuthenticated,userInfo}= auth;
    const {loading : createLoading,success : createSuccess,error :createError,createdProduct} = product;
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch({type: CREATE_PRODUCT_RESET});
       if(!isAuthenticated && !userInfo.isAdmin){
           setRedirect(true);
       }
       if(createSuccess)
       {
           history.push(`/admin/product/${createdProduct._id}/edit`)
       }else{
           dispatch(getProducts());
           dispatch({type: UPDATE_PRODUCT_RESET});
       }
        },[dispatch,history,isAuthenticated,userInfo,success,createdProduct,createSuccess]);
if(redirect)
{
    return <Redirect to={`/signin`}/>
}

    const deleteProductHandler = (id)=>{

        if(window.confirm('Are you sure'))
        {
          
            dispatch(deleteProduct(id));
        }
      
    }
    const createProductHandler = ()=>{
        dispatch(createProduct());
    }
    return (
        <Container>
              <Row className="align-items-center mb-3">
                <Col>
                <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="btn btn-success" onClick={createProductHandler}>
                        <i className="fas fa-plus mr-2"/>Create Product</Button>
                </Col>
              </Row>
                {createError && <Message variant="danger">{createError}</Message>}
               {loading || createLoading? (<Loader/>) : error ? (<Message>{error}</Message>) :
                 <Table striped hover bordered responsive className="table-sm">
                     <thead>
                         <tr>
                         <th>ID</th>
                         <th>Name</th>
                         <th>Price</th>
                         <th>Category</th>
                         <th>Brand</th>
                         <th>Action</th>
                         </tr>
                     </thead>
                     <tbody>
                         {
                            !isEmpty(products) && products.map(product=>
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td><Link to={`/product/${product._id}`}>{product.name}</Link></td>
                                    <td>{product.price}</td>
                                    <td>
                                       {product.category}
                                    </td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button className="btn-sm" variant="light"><i className="fas fa-edit"/></Button>
                                        </LinkContainer>
                                        <Button variant="danger" className="btn-sm ml-1" onClick={()=> deleteProductHandler(product._id)}>
                                            <i className="fas fa-trash"/>
                                        </Button>

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

export default Products;
