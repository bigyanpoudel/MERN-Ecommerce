import React,{useEffect} from 'react'
import {Row,Col,Spinner} from 'react-bootstrap';
import Product from '../component/Product';
import {useSelector,useDispatch} from 'react-redux';
import {getProducts,getTopProduct} from '../store/action/productActionCreator';
import Message from '../component/Message';
import Loader from '../component/Loader';
import Paginate from '../component/Paginate';
import ProductCarousel from '../component/ProductCarousel';
import UseMeta from '../component/UseMeta';
import {Link} from 'react-router-dom';
const Home = ({match}) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber;
    const {productList} = useSelector((state=>{
        return{
            productList: state.productList
        }
    }));
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getTopProduct());
        dispatch(getProducts(keyword,pageNumber));
    },[dispatch,keyword,pageNumber]);
 const {products,loading,error,pages,pageNumber : page,topProducts} = productList;
    console.log(topProducts);
    return (
        <>
        <UseMeta title="welcome to wallmart | Home" 
            descContent="best quality product at cheap price"
            descKeyword="electronics, electronics goods, clothes,electronics products"/>
        {loading ? 
         <Loader/> : error ? <Message variant="danger">{error}</Message>:
            <>
            {!keyword ? <ProductCarousel products={topProducts}/> : <Link to="/" className="btn btn-light">Go Back</Link>}
           {keyword ? (<h3>Searched Product</h3>) : <h2>Our Latest Product</h2>}
          
            <Row>
                {
                    products.map((product)=>
                        <Col sm="12" md="6" lg="4" xl="3" key={product._id}>
                        <Product product={product}/>
                        </Col>
                    )
                }
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
            </>
        }
        </>
    )
}

export default Home
