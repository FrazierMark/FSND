

import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";


const CreateProductForm2 = () => {

    const [accessToken] = useState('');
    const [token, setToken] = useState(null);
    const { getAccessTokenSilently } = useAuth0();
    
  useEffect(() => {
      // Get AccessToken to later confirm if perissions are satisfied in order to POST
        const getToken = async () => {
          try {
            const accessToken = await getAccessTokenSilently({})
            setToken(accessToken)
          } catch (e) {
            console.log(e.message)
          }
        }
    getToken()
    // If accessToken changes, trigger refresh
      }, [getAccessTokenSilently])


    // Initial form values
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
   

    const handleSubmit = async (e) => {
        console.log('submitting');
        e.preventDefault();
        alert("New Product Added!");
        console.log(token)
        postCreateProduct(
            values.name,
            values.description,
            values.sku,
            values.category,
            values.price
        );   
    };

    // Product Created if Admin privilege are satisfied
    const postCreateProduct = async(
        name,
        description,
        sku,
        category,
        price
        ) => {
            console.log(accessToken)
            const newProduct = {name, description, sku, category, price};
            
            axios.post('https://grainydays.herokuapp.com/CreateProduct', newProduct, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
        })
        .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err.message);
          });
      };

    
        return (
            
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <p> Create New Product </p>
                
                    <input type="text" placeholder="Add Product Name" value={values.name} onChange={handleChange('name')} className="form-control" /> 
                        <input type="text" placeholder="Add Product Description" value={values.description} onChange={handleChange('description')} className="form-control" />
                        <input type="number" placeholder="Add Product SKU" value={values.sku} onChange={handleChange('sku')} className="form-control" /> 
                        <input type="text" placeholder="Add Product Category" value={values.category} onChange={handleChange('category')} className="form-control" /> 
                        <input type="float" placeholder="Add Product Price" value={values.price} onChange={handleChange('price')} className="form-control" /> 
                        <input type="submit" value="Create Product" className="form-control" />
                </form>
            </div>
        )
}

export default CreateProductForm2;