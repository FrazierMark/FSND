import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

// Retrieves all Camera Products from db and maps to table
const GetCameras = () => {

  const [accessToken] = useState('');
  const [token, setToken] = useState(null);
  const { getAccessTokenSilently } = useAuth0();
  const [camera, setCamera] = useState([]);

    const getCameraData = async () => {
        try {
            const data = await axios.get('https://grainydays.herokuapp.com/CameraPage');
        console.log(data.data.cameras);
        setCamera(data.data.cameras);
    } catch (e){
        console.log(e);
    }
};
    
    useEffect(() => {
        getCameraData();
    }, []);



    const handleSubmit = (id) => {
      console.log(id)
      // e.preventDefault();
      alert("Product Added to Cart!");
      console.log(token)
      addToCart(id);   
  };

  const addToCart = async(
      id,
      ) => {
          console.log(accessToken)
          
          const newProduct = {id};
          
          axios.post('https://grainydays.herokuapp.com/CartPage', newProduct, {
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

      <table className="table-latitude">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>SKU</th>
            <th>category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>

        {camera.map((product, id) => {
            return (
            <tr key={id}>  
            
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.sku}</td>
            <td>{product.category}</td>
            <td>{product.price}</td>
            <td><button onClick={() => handleSubmit(product.id)}> Add To Cart
             </button></td>
            </tr>
          );
        })}
        </tbody>
      </table>
    
    );
};




export default GetCameras;