import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
// create-camera-product


const CreateProductForm = () => {
    const domain = "m-mark-frazier.us.auth0.com";
    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
    const accessToken = getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
        scope: "read:current_user",
      }); 
    
    const [values, setValues] = useState({
        name: '',
        description: '',
        sku: '',
        category: '',
        price: '',
    })
    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };
        
    const handleSubmit = (e) => {
        e.preventDefault()

        const { name, description, sku, category, price } = values;
        const newProduct = {name, description, sku, category, price};
        

        axios.post('http://127.0.0.1:5000/CreateProduct', {newProduct},
        {headers: {'Authorization': `bearer ${accessToken}`}
    })

        .then((res) => {
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
        });
    }


        return (
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Add Product Name</label>
                        <input type="text" value={values.name} onChange={handleChange('name')} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Add Product Description</label>
                        <input type="text" value={values.description} onChange={handleChange('description')} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Add Product Sku</label>
                        <input type="text" value={values.sku} onChange={handleChange('sku')} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Add Product Category</label>
                        <input type="text" value={values.category} onChange={handleChange('category')} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Add Product Price</label>
                        <input type="float" value={values.price} onChange={handleChange('price')} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Product" className="btn btn-success btn-block" />
                    </div>
                </form>
                
            </div>
        )
}

export default CreateProductForm