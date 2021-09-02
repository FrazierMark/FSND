import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";


const GetLenses = () => {

  const [accessToken] = useState('');
  const [token, setToken] = useState(null);
  const { getAccessTokenSilently } = useAuth0();


    const [lens, setLens] = useState([]);

    const getLensData = async () => {
        try {
            const data = await axios.get('https://grainydays.herokuapp.com/LensPage');
        console.log(data.data.lenses);
        setLens(data.data.lenses);
    } catch (e){
        console.log(e);
    }
};
    
    useEffect(() => {
        getLensData();
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
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>

        {lens.map((item, id) => {
            return (
            <tr key={item.id}>  
            
            <td> {item.name} </td>
            <td>{item.description}</td>
            <td>{item.sku}</td>
            <td>{item.category}</td>
            <td>{item.price}</td>
            <td><button onClick={() => handleSubmit(item.id)}> Add To Cart
             </button></td>
            </tr>
          );
        })}
        </tbody>
      </table>
    
    );
};




export default GetLenses;