import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';


const GetCartInfo = () => {


  const [accessToken] = useState('');
  const [token, setToken] = useState(null);
  const { getAccessTokenSilently } = useAuth0();
  const [cartInfo, setCartInfo] = useState([]);


//   useEffect(() => {
//     getCartData();
// }, []);


    
//   useEffect(() => {
//       const getToken = async () => {
//         try {
//           const accessToken = await getAccessTokenSilently({})
//           setToken(accessToken)
//         } catch (e) {
//           console.log(e.message)
//         }
//       }
//       getToken()
//       console.log(accessToken)
//     }, [getAccessTokenSilently])

    
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
    }
};
    getCartData();
    }, [getAccessTokenSilently]); 

    
    





//     const handleSubmit = (id) => {
//       console.log(id)
//       // e.preventDefault();
//       alert("New Product Added!");
//       console.log(token)
//       addToCart(id);   
//   };





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


    
    return (token && 

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
            <td><button > Add To Cart
             </button></td>
            </tr>
          );
        })}
        </tbody>
      </table>
    
    );
};




export default GetCartInfo;