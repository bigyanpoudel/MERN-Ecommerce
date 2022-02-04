import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/action/actionCreator";
import SearchBox from "./SearchBox";
import { Route } from "react-router-dom";
const Header = () => {
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, userInfo } = auth;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Fashion Store</Navbar.Brand>
          </LinkContainer>
          <Route render={({ history }) => <SearchBox history={history} />} />

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart pr-1" />
                  Cart
                </Nav.Link>
              </LinkContainer>
              {isAuthenticated && userInfo ? (
                <NavDropdown title={userInfo.name} id="user">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/myorder">
                    <NavDropdown.Item>My Order</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/signin">
                  <Nav.Link>
                    <i className="fas fa-user pr-1" />
                    Sign in
                  </Nav.Link>
                </LinkContainer>
              )}
              {isAuthenticated && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="admin">
                  <LinkContainer to="/admin/users">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/products">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
