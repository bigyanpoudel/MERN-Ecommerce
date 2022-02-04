import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  ListGroup,
  Image,
  Button,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../component/Rating";
import { useSelector, useDispatch } from "react-redux";
import {
  getProduct,
  productReview,
} from "../store/action/productActionCreator";
import Message from "../component/Message";
import Loader from "../component/Loader";
import { PRODUCT_REVIEW_RESET } from "../store/action/actionTypes";
import UseMeta from "../component/UseMeta";
const Product = ({ match, history }) => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { auth, productList } = useSelector((state) => {
    return {
      productList: state.productList,
      auth: state.auth,
    };
  });
  const productId = match.params.id;
  const dispatch = useDispatch();

  const { product, loading, error, reviewSuccess, reviewError } = productList;
  const { userInfo } = auth;
  useEffect(() => {
    if (reviewSuccess) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_RESET });
    }
    dispatch(getProduct(productId));
  }, [dispatch, productId, reviewSuccess]);
  const addToCartHandler = (e) => {
    e.preventDefault();
    history.push(`/cart/${productId}/?qty=${quantity}`);
  };
  const addCommentHandler = (event) => {
    event.preventDefault();
    const review = {
      rating,
      comment,
    };
    console.log(review);
    dispatch(productReview(productId, review));
  };
  return (
    <>
      <UseMeta title={product.name} />
      <Link to="/" className="btn btn-light my-2">
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  Brand: <span className="pl-2">{product.brand}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Category: <span className="pl-2">{product.category}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: <span className="pl-2">${product.price}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description:{" "}
                  <span className="pl-2"> {product.description} </span>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price</Col>
                      <Col>
                        <strong>$ {product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0 ? "In Stock" : "Out Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      type="submit"
                      className="btn btn-block"
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h1>Reviews</h1>
              {reviewError && <Message>{reviewError}</Message>}
              {product.reviews && product.reviews.length === 0 && (
                <Message>No reviews</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                <ListGroup.Item>
                  {/* <h4>Write a review</h4>
                                    {
                                       uerInfo && userInfo._id ? (
                                        <Card><Form onSubmit={addCommentHandler}>
                                            <Form.Group controlId="rating">
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control as='select' value={rating}
                                                onChange={(e)=> setRating(e.target.value)}
                                                 >
                                                     <option value=''>Select</option>
                                                     <option value="1"> 1-poor</option>
                                                     <option value="2">2- fair</option>
                                                     <option value="3">3- good</option>
                                                     <option value="4">4-very good</option>
                                                     <option value="5">5 - Excellent</option>
                                                 </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="comment">
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control as="textarea" row={3} value={comment}
                                                    onChange={(e)=> setComment(e.target.value)}/>
                                            </Form.Group>
                                            <Button type="submit" className="btn btn-block">Add comment</Button>
                                        </Form>
                                        </Card>): 
                                        <Message>Please 
                                            <Link to={`/signin`}>Sign in</Link> to write a review</Message>
                                    } */}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Product;
