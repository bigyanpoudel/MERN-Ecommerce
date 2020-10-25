import React from 'react'
import {Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
const CheckoutProcess = ({step1,step2,step3,step4}) => {
    return (
            <Nav className="justify-content-md-center justify-content-xs-start">
                <Nav.Item>
                    {
                        step1 ?
                        <LinkContainer to="/signin">
                            <Nav.Link>Signin</Nav.Link>
                        </LinkContainer>
                        :
                        <Nav.Link disabled>Signin</Nav.Link>
                    }
                </Nav.Item>
                <Nav.Item>
                    {
                        step2 ?
                        <LinkContainer to="/shipping">
                            <Nav.Link>Shipping</Nav.Link>
                        </LinkContainer>
                        :
                        <Nav.Link disabled>Shipping</Nav.Link>
                    }
                </Nav.Item>
                <Nav.Item>
                    {
                        step3 ?
                        <LinkContainer to="/payment">
                            <Nav.Link>Payment</Nav.Link>
                        </LinkContainer>
                        :
                        <Nav.Link disabled>Payment</Nav.Link>
                    }
                </Nav.Item>
                <Nav.Item>
                    {
                        step4 ?
                        <LinkContainer to="/checkout">
                            <Nav.Link>Checkout</Nav.Link>
                        </LinkContainer>
                        :
                        <Nav.Link disabled>Checkout</Nav.Link>
                    }
                </Nav.Item>
            </Nav>
         
       
    )
}

export default CheckoutProcess
