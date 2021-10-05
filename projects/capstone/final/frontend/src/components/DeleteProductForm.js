import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";


// Deletes Product by SKU value
const DeleteProductForm = () => {

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
        sku: '',
    })

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };
   

    const handleSubmit = async (e) => {
        console.log('submitting');
        e.preventDefault();
        alert("Product...no more...");
        console.log(token)
        postDeleteProduct(
        values.sku,
        );
        e.target.reset();
    };

    // Product Deleteded if Admin privilege are satisfied
    const postDeleteProduct = async(
        sku
        ) => {
            console.log(accessToken)
            // const { name, description, sku, category, price } = values;
            const deletedProduct = {sku};
            console.log(sku)
            
            axios.delete('https://grainydays.herokuapp.com/CreateProduct', {
                data: {
                    deletedProduct: deletedProduct
                },    
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
                        <p>Delete Product by SKU</p>
                        <input type="number" placeholder="Product SKU to Delete" value={values.sku} onChange={handleChange('sku')} className="form-control" />
                        <input type="submit" value="Delete Product" className="btn btn-success btn-block" />
                </form>
            </div>
        )
}

export default DeleteProductForm;