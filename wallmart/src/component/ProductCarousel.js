import React from 'react'
import {Carousel,Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
const ProductCarousel = ({products}) => {
    return (
        <Carousel pause="hover" className="mx-2 mb-3 bg-dark">
            {
                products.map(product=>{
                    return(
                        <Carousel.Item key={products._id} className="justify-content-center align-items-center">
                           <Link to={`/product/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid/>
                            <Carousel.Caption className="carousel-caption">
                                <strong>{product.name}</strong>
                            </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    )
                })
            }
        </Carousel>
    )
}

export default ProductCarousel
