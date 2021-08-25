import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";


const UpdateProductForm = () => {

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
        sku: '',
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
        console.log(token)
        patchUpdateProduct(
        values.sku,
        values.name,
        values.description,
        values.category,
        values.price
        );
    };

    const patchUpdateProduct = async(
        sku,
        name,
        description,
        category,
        price
        ) => {
            console.log(accessToken)
            // const { name, description, sku, category, price } = values;
            const updatedProduct = {sku, name, description, category, price};
            console.log(updatedProduct)
            
            axios.patch('http://127.0.0.1:5000/CreateProduct', updatedProduct, {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
        })
        .then((res) => {
            console.log(res);
            alert("Product Updated!");
          })
          .catch((err) => {
            console.log(err.message);
            
          });
        };

    
        return (
            
            <div className="form1">
                <form onSubmit={handleSubmit}>
                        <p>Update Product by SKU</p>
                        <input type="number" placeholder="Product SKU to Update" value={values.sku} onChange={handleChange('sku')} className="form-control" />
                        <input type="text" placeholder="Update Product Name" value={values.name} onChange={handleChange('name')} className="form-control" /> 
                        <input type="text" placeholder="Update Product Description" value={values.description} onChange={handleChange('description')} className="form-control" />
                        <input type="text" placeholder="Update Product Category" value={values.category} onChange={handleChange('category')} className="form-control" /> 
                        <input type="float" placeholder="Update Product Price" value={values.price} onChange={handleChange('price')} className="form-control" /> 
                        <input type="submit" value="Update Product" className="btn btn-success btn-block" />
                </form>
            </div>
        )
}

export default UpdateProductForm;