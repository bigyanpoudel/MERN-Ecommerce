import React from 'react';
import './App.css';
import Layout from './component/Layout'; 
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import MyOrder from './pages/MyOrder'; 
import Users from './pages/Users';
import EditUser from './pages/editUser';
import Products from './pages/Products';
import EditProduct from './pages/EditProduct';
import AdminOrders from './pages/AdminOrders';
function App() {
  return (
    <>
    <Router>
      <Layout>
        <Switch>
        <Route exact path="/admin/product/:id/edit" component={EditProduct}/>
          <Route exact path="/user/:id/edit" component={EditUser}/>
          <Route exact path="/admin/users" component={Users}/>
          <Route exact path="/admin/orders" component={AdminOrders}/>
          <Route exact path="/admin/products" component={Products}/>
          <Route exact path="/admin/products/:pageNumber" component={Products}/>
          <Route exact path="/myorder" component={MyOrder}/>
          <Route exact path='/order/:id' component={Order}/>
          <Route exact path="/placeorder" component={PlaceOrder}/>
          <Route exact path="/payment" component={Payment}/>
          <Route exact path="/shipping" component={Shipping}/>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/signin" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route  path="/product/:id" component={Product}/>
          <Route path="/cart/:id?" exact component={Cart}/>
           <Route exact path="/search/:keyword" component={Home}/>
            <Route exact path="/search/:keyword/page/:pageNumber" component={Home}/>
             <Route exact path="/page/:pageNumber" component={Home}/>
          <Route exact path="/" component={Home}/>
        </Switch>
      </Layout>
    </Router>
    </>
  );
}

export default App;
