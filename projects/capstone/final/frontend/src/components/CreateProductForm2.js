
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Auth0Provider } from "@auth0/auth0-react";
import GetAPItoken from "./getAccessToken";

const domain = "m-mark-frazier.us.auth0.com";




axios.post('http://127.0.0.1:5000/CreateProduct', {newProduct},
    {headers: {'Authorization': `bearer ${accessToken}`}
})




const CreateProductForm2 = () => {

    useEffect(() => {
        
        const getAccessToken = async () => {
            const domain = 'dev-ip1x4wr7.eu.auth0.com';
    
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
        
      }, [user, getAccessTokenSilently]);
    
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
          values.name,
          values.description,
          values.sku,
          values.category,
          values.price
        );
        setSubmitPost(true);
      };

    async function postCreateProduct(
    name,
    description,
    sku,
    viewVidSource,
    previewAudioSource
    ) {
    try {
        const res = await fetch(`${BACKEND_URL}/posts`, {
        method: 'POST',
        body: JSON.stringify({
            user_id: userId,
            text: text,
            image: previewImgSource,
            video: previewVidSource,
            audio: previewAudioSource,
            mood: emotion,
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
    // once submted redirect to Journal View Page
    history.push('/journalview');
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