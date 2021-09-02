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

    
    const [film, setFilm] = useState([]);

    const getFilmData = async () => {
        try {
            const data = await axios.get('https://grainydays.herokuapp.com/FilmPage');
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
      alert("New Product Added!");
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