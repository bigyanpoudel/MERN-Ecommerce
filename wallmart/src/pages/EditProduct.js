import React,{useState,useEffect} from 'react';
import {Link,Redirect} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {Button,Form,Spinner} from 'react-bootstrap';
import Message from '../component/Message';
import Loader from '../component/Loader';
import  {getProduct,updateProductById} from '../store/action/productActionCreator';
import FormContainer from '../component/FormContainer';
import {UPDATE_PRODUCT_RESET} from '../store/action/actionTypes';
import axios from 'axios';
const EditProduct = ({match,history}) => {
    const productId = match.params.id;
   const [redirect,setRedirect]=useState(false)
   const [name,setName]=useState('');
    const [description,setDescription]=useState('');
    const [brand,setBrand]=useState('');
    const [category,setCategory]=useState('');
    const [image,setImage]=useState('');
    const [price,setPrice]=useState(0); 
    const [countInStock,setCountInStock]=useState(0);
    const [uploading,setUploading]= useState(false);
    const auth= useSelector(state=> state.auth);
    const dispatch = useDispatch();
    const productList = useSelector(state=> state.productList);
   const { loading,error,product} = productList;
   const updateProduct= useSelector(state=> state.updateProduct);
   const {loading : updateLoading, success,error:updateError} = updateProduct;
    useEffect(()=>{
       
        if(!auth.isAuthenticated && !auth.userInfo.isAdmin)
        {
            setRedirect(true);
        }
        if(success)
        {
            dispatch({type: UPDATE_PRODUCT_RESET})
            history.push('/admin/products');
        }else{
        if(!product || product._id !== productId)
        {
            dispatch(getProduct(productId));
        }else{
            console.log(product)
           setName(product.name);
           setBrand(product.brand);
           setCategory(product.category);
           setDescription(product.description);
           setImage(product.image);
           setPrice(product.price);
           setCountInStock(product.countInStock);
        }}
    },[dispatch,productId,product,history,success,auth,setRedirect]);
    if(redirect)
    {
        return <Redirect to={`/signin`}/>
    }
    const submitHandler = (e)=>{
        e.preventDefault();
        const productData = {
            name,
            brand,
            category,
            price,
            image,
            countInStock,
            description
        }
        dispatch(updateProductById({id:product._id,productData}));
    }
 const fileUploadHandler = async(e)=>{
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append('image',file);
    setUploading(true);
    try{
        const config = {
            headers:{
                'content-type':'multipart/form-data'
            }
        }
        const {data} = await axios.post('/api/v1/upload',formData,config);
        setImage(data);
        setUploading(false);
    }catch(err){
        console.log(err.response);
        console.log(err);
        setUploading(false)
    }
 }
    return (
       <>
       <Link to='/admin/products'>
        <Button className="btn btn-light">Go Back</Button>
       </Link>
        <FormContainer>
           
            <h1>Edit Product</h1>
            {
                loading  || updateLoading ? <Loader/> : error ? <Message variant="danger">{error}</Message>: 
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' name="name"
                    placeholder="enter product name" value={name} onChange={(e)=> setName(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description" 
                    placeholder="enter product description" value={description} onChange={(e)=> setDescription(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="text" name="image" 
                    placeholder="enter image url" value={image} onChange={(e)=> setImage(e.target.value)}/>
                    <Form.File id="image-file" label="choose image file" className="mt-2" custom onChange={fileUploadHandler}></Form.File>
                    {uploading && <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                        </Spinner>}
                </Form.Group>
                <Form.Group controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type='text' name="brand"
                    placeholder="enter product brand" value={brand} onChange={(e)=> setBrand(e.target.value)}/>
                      
                </Form.Group>
                <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control type='text' name="category"
                    placeholder="enter product category" value={category} onChange={(e)=> setCategory(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type='number' name="price"
                    placeholder="enter product price" value={price} onChange={(e)=> setPrice(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId='countInStock'>
                    <Form.Label>CountInStock</Form.Label>
                    <Form.Control type='number' name="countInStock"
                    placeholder="enter product count" value={countInStock} onChange={(e)=> setCountInStock(e.target.value)}/>
                </Form.Group>
                <Button type="submit" className="btn btn-Success py-2 rounded">Update Product</Button>
                </Form>
            }
            </FormContainer>
        </>
    )
}

export default EditProduct;
