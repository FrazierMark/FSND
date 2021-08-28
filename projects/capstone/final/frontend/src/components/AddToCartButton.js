

import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";


const AddToCartButton = () => {

    const [accessToken] = useState('');
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
        addToCart(
            values.name,
            values.description,
            values.sku,
            values.category,
            values.price
        );   
    };

    const addToCart = async(
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
            
            <button>
            Add To Cart
            onSubmit={handleSubmit}
            </button>
        )
}

export default AddToCartButton;