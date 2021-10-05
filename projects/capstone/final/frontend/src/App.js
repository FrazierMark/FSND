import React from 'react';
import Header from "./components/Header";
import './App.scss'
import {Route, Switch} from 'react-router-dom'
import CameraPage from './components/CameraPage';
import LensPage from './components/LensPage';
import LandingPage from './components/LandingPage';
import FilmPage from './components/FilmPage'
import CartPage from './components/CartPage';
import ProfilePage from './components/ProfilePage';
import CreateProduct from './components/CreateProduct';
import Footer from './components/Footer';
import { useAuth0 } from "@auth0/auth0-react";
import { Loader } from '@react-three/drei';



 const App = () => {
  const { isLoading } = useAuth0();
  
  if (isLoading) {
    return <Loader />
  };
  return (
    <div>
    <Header/>
    
    <Switch>
        <Route path="/" exact component= {LandingPage} />
        <Route path="/CameraPage" component= {CameraPage} />
        <Route path="/LensPage" component= {LensPage} />
        <Route path="/FilmPage" component= {FilmPage} />
        <Route path="/CartPage" component= {CartPage} />
        <Route path="/ProfilePage" component= {ProfilePage} />
        <Route path="/CreateProduct" component= {CreateProduct} />

      </Switch>
      <Footer/>
    </div>
  );
}
export default App;