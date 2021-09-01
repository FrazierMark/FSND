import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';


const GetCartInfo = () => {

  const [accessToken] = useState('');
  const [token, setToken] = useState(null);
  const { getAccessTokenSilently } = useAuth0();
  const [cartInfo, setCartInfo] = useState([]);

     
  useEffect(() => {
    getToken()
  }, [])

  const getToken = async () => {
    try {
      const accessToken = await getAccessTokenSilently({})
      
      setToken(accessToken)
    } catch (e) {

      console.log(e.message)
    }
    return (1)
  }

  useEffect(() => {
    getCartData();
  }, []);



    const getCartData = async () => {
      console.log(token)
      try {
          const data = await axios.get('http://127.0.0.1:5000/CartPage', {
              headers: {
                  Authorization: `Bearer ${token}`,
                  },
          });
      console.log(data.data.cart_products);
      setCartInfo(data.data.cart_products);
  } catch (e){
      console.log(e);
  }}

  // const getCartData = async () => {
  //             var token2 = await Promise.all(getToken())
  //             console.log(token2)
                            
  //              await axios.get('http://127.0.0.1:5000/CartPage', {
  //                 headers: {
  //                   Authorization: `Bearer ${token2}`,
  //                 },
  //         })
  //         .then((res) => {
  //           const cartInfo = res.data.cart_products;
  //           console.log(cartInfo)
  //           setCartInfo(cartInfo);
  //             console.log(res);
  //           })
  //           .catch((err) => {
  //             console.log(err.message);
  //           });
            
  //       };
    

        return (
          <table className="table-latitude">
            <thead>
              <tr>
                <th>Cart</th>
                <th>User</th>
                <th>Product</th>
              </tr>
            </thead>
            <tbody>
    
            {cartInfo.map((item, id) => {
                return (
                <tr key={id}>  
                
                <td> {item.cart_id} </td>
                <td>{item.user_id}</td>
                <td>{item.product_id}</td>
                
                <td><button > Remove Item
                 </button></td>
                </tr>
              );
            })}
            </tbody>
          </table>
        
        );
    
}

export default GetCartInfo;