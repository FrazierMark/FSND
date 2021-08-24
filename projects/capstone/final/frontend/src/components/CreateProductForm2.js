
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Auth0Provider } from "@auth0/auth0-react";
import GetAPItoken from "./getAccessToken";
import  { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


// axios.post('http://127.0.0.1:5000/CreateProduct', {newProduct},
//     {headers: {'Authorization': `bearer ${accessToken}`}
// })

// const res = axios.post('http://127.0.0.1:5000/CreateProduct', {newProduct},
//         {headers: {'Authorization': `bearer ${accessToken}`}

const BACKEND_URL = process.env.React_APP_SERVER_URL

const CreateProductForm2 = () => {
    const [accessToken, setaccessToken] = useState(null);
    const { getAccessTokenSilently } = useAuth0;

    useEffect(() => {

        
        const getAccessToken = async () => {
            const domain = "m-mark-frazier.us.auth0.com";
    
            try {
              const accessToken = await getAccessTokenSilently({
                audience: "m-mark-frazier.us.auth0.com",
                scope: 'read:current_user',
              });
    
              setaccessToken(accessToken);
            } catch (e) {
              console.log(e.message);
            }
          };
          getAccessToken();
        
      }, [getAccessTokenSilently]);
    
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

    const { name, description, sku, category, price } = values;
    const newProduct = {name, description, sku, category, price};
   

    const handleSubmit = (e) => {
        console.log('submitting');
        e.preventDefault();
        toast(`You've posted a new product!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        postCreateProduct(
          newProduct
        );
        
      };

    async function postCreateProduct(
    name,
    description,
    sku,
    category,
    price
    ) {
    try {
        const res = await fetch(`${BACKEND_URL}/CreateProduct`, {
            method: 'POST',
            body: JSON.stringify({
                name: values.name,
                description: values.description,
                sku: values.sku,
                category: values.category,
                price: values.price
            }),
            headers: {
            'content-type': 'application/JSON',
            Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await res.json();
    } catch (error) {
        console.error(error);
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
}}

export default CreateProductForm2;