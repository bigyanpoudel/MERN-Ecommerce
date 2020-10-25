import React,{useEffect} from 'react'
import {Row,Col,Spinner} from 'react-bootstrap';
import Product from '../component/Product';
import {useSelector,useDispatch} from 'react-redux';
import {getProducts} from '../store/action/productActionCreator';
import Message from '../component/Message';
import Loader from '../component/Loader';
const Home = () => {
    const {productList} = useSelector((state=>{
        return{
            productList: state.productList
        }
    }));
    const dispatch = useDispatch();
    useEffect(()=>{
       
        dispatch(getProducts());
    },[dispatch]);
 const {products,loading,error} = productList;
    return (
        <>
        {loading ? 
         <Loader/> : error ? <Message variant="danger">{error}</Message>:
            <>
            <h2>Our Latest Product</h2>
            <Row>
                {
                    products.map((product)=>
                        <Col sm="12" md="6" lg="4" xl="3" key={product._id}>
                        <Product product={product}/>
                        </Col>
                    )
                }
            </Row>
            </>
        }
        </>
    )
}

export default Home
