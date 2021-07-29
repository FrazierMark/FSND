import React, { Component } from 'react';
import Header from "./components/Header";
import './App.scss'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import CameraPage from './components/CameraPage';
import LensPage from './components/LensPage';
import LandingPage from './components/LandingPage';
import FilmPage from './components/FilmPage'
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';


export default function App() {
  return (
    <>
    <Header/>
    <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/CameraPage" component={CameraPage} />
        <Route path="/LensPage" component={LensPage} />
        <Route path="/FilmPage" component={FilmPage} />
        <Route path="/CartPage" component={CartPage} />
        <Route path="/CheckoutPage" component={CheckoutPage} />

      </Switch>

    </>
  );
}
