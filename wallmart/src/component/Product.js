import React from 'react'
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Rating from './Rating';
const Product = ({product}) => {
    return (
        <>
            <Card className="my-2 p-2 rounded">
                <Link to={`product/${product._id}`} className="text-decoration-none">
                     <Card.Img src={product.image} variant="top"/>
                </Link>
                <Card.Body>
                    <Link to={`product/${product._id}`} className="text-decoration-none">
                        <Card.Text as='div' >
                           <strong> {product.name} </strong>
                        </Card.Text>
                    </Link>
                    <Card.Text as='div' className="my-2">
                        <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                    </Card.Text>
                    <Card.Text as="h2">
                        ${product.price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default Product
