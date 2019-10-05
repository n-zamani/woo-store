import React from 'react';
import './App.scss';
import { history } from './_helpers/history';
import Navbar from './_components/navbar';
import { MainPage, RegisterPage, ProductsPage, ProductPage, CategoriesPage, CartPage, CheckoutPage, LoginPage, UserPage } from './_pages';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/categories" exact component={CategoriesPage} />
      <Route path="/category/:categoryId/:categorySlug" exact component={ProductsPage} />
      <Route path="/product/:productId/:productSlug" exact component={ProductPage} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/register" exact component={RegisterPage} />
      <Route path="/cart" exact component={CartPage} />
      <Route path="/checkout" exact component={CheckoutPage} />
      <Route paht="/user" exact component={UserPage} />
    </Switch>
  </Router>
}

export default App;
