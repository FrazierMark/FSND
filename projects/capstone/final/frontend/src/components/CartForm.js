import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';


const GetCartInfo = () => {

  const [accessToken] = useState('');
  const [token, setToken] = useState(null);
  const { getAccessTokenSilently } = useAuth0();
  const [cartInfo, setCartInfo] = useState([]);


     
  useEffect(() => { 
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({})
        console.log(accessToken)
        setToken(accessToken)
      } catch (e) {
        console.log(e.message)
      }
    }
    getToken()
  }, [getAccessTokenSilently])






  useEffect(() =>  {
    const getCartData = async () => {
      console.log(token)
      try {
          const data = await Promise.all(axios.get('http://127.0.0.1:5000/CartPage', {
              headers: {
                  Authorization: `Bearer ${token}`,
                  },
          }));
      console.log(data.data.cart_products);
      setCartInfo(data.data.cart_products);
  } catch (e){
      console.log(e);
  }
};
  getCartData();
  console.log(cartInfo)
  }, [getAccessTokenSilently]); 


    
   





    const getCartData = async () => {
      try {
        console.log(token)
        
         const data = await Promise.all(axios.get('http://127.0.0.1:5000/CartPage', {
              headers: {
                  Authorization: `Bearer ${token}`,
                  }
          }))
    .then(async data =>{
      setCartInfo(data.data.cart_products)
      if(data.status === 200){
          return await data.data
      }
      return null;
      
  })}
  
  catch(error){
      return error
  }
};





//   const addToCart = async(
//       id,
//       ) => {
//           console.log(accessToken)
          
//           const newProduct = {id};
          
//           axios.post('http://127.0.0.1:5000/CartPage', newProduct, {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//       })
//       .then((res) => {
//           console.log(res);
//         })
//         .catch((err) => {
//           console.log(err.message);
//         });
//     };


    
    
return (
  <table className="table-latitude">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Sku</th>
        <th>Category</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>

    {cartInfo.map((item, id) => {
        return (
        <tr key={id}>  
        
        <td> {item.name} </td>
        <td>{item.description}</td>
        <td>{item.sku}</td>
        <td>{item.category}</td>
        <td>{item.price}</td>
        <td><button > Remove Item
         </button></td>
        </tr>
      );
    })}
    </tbody>
  </table>

);
};




export default GetCartInfo;