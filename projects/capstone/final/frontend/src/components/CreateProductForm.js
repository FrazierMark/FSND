import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import Profile from './ProfileContent';

// create-camera-product
const GetHeaders = () => {
    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);

    useEffect(() => {
        const getUserMetadata = async () => {
          const domain = "m-mark-frazier.us.auth0.com";
      
          try {
            const accessToken = await getAccessTokenSilently({
              audience: `https://${domain}/api/v2/`,
              scope: "read:current_user",
            });
      
            const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
      
            const metadataResponse = await fetch(userDetailsByIdUrl, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
      
            const { user_metadata } = await metadataResponse.json();
      
            setUserMetadata(user_metadata);
          } catch (e) {
            console.log(e.message);
          }
        };
      
        getUserMetadata();
      }, [getAccessTokenSilently, user?.sub]);

      return (user)
}


const CreateProductForm = () => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        sku: '',
        category: '',
        price: '',
    })


    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }
        
    
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://127.0.0.1:5000/CreateProduct', values,
        // headers: {Authorization: "Bearer" + token}
        )
        .then((res) => {
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
        });
    }



    //     axios.post('http://127.0.0.1:5000/CreateProduct', productObject,
    //     // {
    //     //     headers: {Authorization: "Bearer" + token}
    //     // }
    //     )
    //         .then((res) => {
    //             console.log(res.data)
    //         }).catch((error) => {
    //             console.log(error)
    //         });
    // }

        return (
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Add Product Name</label>
                        <input type="text" value={values.name} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Add Product Description</label>
                        <input type="text" value={values.description} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Add Product Sku</label>
                        <input type="text" value={values.sku} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Add Product Category</label>
                        <input type="text" value={values.category} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Add Product Price</label>
                        <input type="float" value={values.price} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Product" className="btn btn-success btn-block" />
                    </div>
                </form>
                
            </div>
        )
    }
export default CreateProductForm