

import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import  { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


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
        toast("Looks like it worked...", {
            position:toast.POSITION.TOP_RIGHT,
        });
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
                        <input type="number" value={values.sku} onChange={handleChange('sku')} className="form-control" />
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

export default CreateProductForm2;