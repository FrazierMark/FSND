

import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";


const BACKEND_URL = process.env.React_APP_SERVER_URL

const CreateProductForm2 = () => {

    const [accessToken, setAccessToken] = useState('');
    const [token, setToken] = useState(null);
    const { getAccessTokenSilently } = useAuth0();
    
    useEffect(() => {
        const getToken = async () => {
          try {
            const accessToken = await getAccessTokenSilently({})
            setToken(accessToken)
          } catch (e) {
            console.log(e.message)
          }
        }
        getToken()
      }, [getAccessTokenSilently])


    
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

    const postCreateProduct = async(
        name,
        description,
        sku,
        category,
        price
        ) => {
            console.log(accessToken)
            // const { name, description, sku, category, price } = values;
            const newProduct = {name, description, sku, category, price};
            
            axios.post('http://127.0.0.1:5000/CreateProduct', newProduct, {
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
            
            <div className="form1">
                <form onSubmit={handleSubmit}>
                    <p> Create New Product </p>
                
                    <input type="text" placeholder="Add Product Name" value={values.name} onChange={handleChange('name')} className="form-control" /> 
                        <input type="text" placeholder="Add Product Description" value={values.description} onChange={handleChange('description')} className="form-control" />
                        <input type="number" placeholder="Add Product Sku" value={values.sku} onChange={handleChange('sku')} className="form-control" /> 
                        <input type="text" placeholder="Add Product Category" value={values.category} onChange={handleChange('category')} className="form-control" /> 
                        <input type="float" placeholder="Add Product Price" value={values.price} onChange={handleChange('price')} className="form-control" /> 
                        <input type="submit" value="Create Product" className="form-control" />
                </form>

                <div className="drops">
                {/* <div class="drop drop-1"></div>
                <div class="drop drop-2"></div>
                <div class="drop drop-3"></div>
                <div class="drop drop-4"></div>
                <div class="drop drop-5"></div> */}
            
                </div>
            </div>
        )
}

export default CreateProductForm2;