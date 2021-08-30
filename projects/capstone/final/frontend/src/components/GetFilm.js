import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';


const GetAllFilm = () => {


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


    const { isAuthenticated, user } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);

    useEffect(() => {
        const getUserMetadata = async () => {
          const domain = "m-mark-frazier.us.auth0.com";
      
          try {
            const accessToken = await getAccessTokenSilently({
              audience: `https://${domain}/api/v2/`,
              scope: "read:current_user",
            });
      
            const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
      
            const metadataResponse = await fetch(userDetailsByIdUrl, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
      
            const { user_metadata } = await metadataResponse.json();
      
            setUserMetadata(user_metadata);
          } catch (e) {
            console.log(e.message);
          }
        };
      
        getUserMetadata();
      }, [getAccessTokenSilently, user?.sub]);


    const [film, setFilm] = useState([]);

    const getFilmData = async () => {
        try {
            const data = await axios.get('http://127.0.0.1:5000/FilmPage');
        console.log(data.data.all_film);
        setFilm(data.data.all_film);
    } catch (e){
        console.log(e);
    }
};
    
    useEffect(() => {
        getFilmData();
    }, []);


    const handleSubmit = (id) => {
      console.log(id)
      // e.preventDefault();
      // alert("New Product Added!");
      // console.log(token)
      addToCart(id);   
  };

  const addToCart = async(
      id,
      ) => {
          console.log(accessToken)
          
          const newProduct = {id, userMetadata};
          
          axios.post('http://127.0.0.1:5000/CartPage', newProduct, {
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
            <th>Sku</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>

        {film.map((item, id) => {
            return (
            <tr key={id}>  
            
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




export default GetAllFilm;