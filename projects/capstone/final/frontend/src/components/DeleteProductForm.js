import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import  { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const BACKEND_URL = process.env.React_APP_SERVER_URL

const DeleteProductForm = () => {

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
        postDeleteProduct(
        values.sku,
        );
        e.target.reset();
    };

    const postDeleteProduct = async(
        sku
        ) => {
            console.log(accessToken)
            // const { name, description, sku, category, price } = values;
            const deletedProduct = {sku};
            console.log(sku)
            
            axios.delete('http://127.0.0.1:5000/CreateProduct', {
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
            
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Delete Product by Sku</label>
                        <input type="number" value={values.sku} onChange={handleChange('sku')} className="form-control" />
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="Delete Product" className="btn btn-success btn-block" />
                    </div>
                </form>

            </div>
        )
}

export default DeleteProductForm;