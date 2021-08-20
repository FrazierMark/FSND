import React from 'react';
import Header from "./components/Header";
import './App.scss'
import {
  Route,
  Switch
} from 'react-router-dom'
import CameraPage from './components/CameraPage';
import LensPage from './components/LensPage';
import LandingPage from './components/LandingPage';
import FilmPage from './components/FilmPage'
import CartPage from './components/CartPage';
import ProfilePage from './components/ProfilePage';
import CreateProduct from './components/CreateProduct';
import Footer from './components/Footer'
import Loading from './components/Loading';
import { useAuth0 } from "@auth0/auth0-react";



export default function App() {
  const { isLoading } = useAuth0()
  
  if (isLoading) {
    return <Loading />
  };
  return (
    <div>
    <Header/>
    
    <Switch>
        <Route exact path="/" render={() => { return ( <LandingPage />);}} />
        <Route exact path="/CameraPage" render={() => { return ( <CameraPage />);}} />
        <Route exact path="/LensPage" render={() => { return ( <LensPage />);}} />
        <Route exact path="/FilmPage" render={() => { return ( <FilmPage />);}} />
        <Route exact path="/CartPage" render={() => { return ( <CartPage />);}} />
        <Route exact path="/ProfilePage" render={() => { return ( <ProfilePage />);}} />
        <Route exact path="/CreateProduct" render={() => { return ( <CreateProduct />);}} />

      </Switch>
      <Footer/>
    </div>
  );
}
