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

    // const addToCart = (product) => {
    //     console.log('we are in addtocart')
    //     setCart([...cart, product]); //using array destructering to append product to cart array
    // };

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


    const handleSubmit = async (e) => {
      console.log('submitting');
      e.preventDefault();
      alert("New Product Added!");
      console.log(token)
      addToCart(
          item.id,
      );   
  };

  const addToCart = async(
      id,
      ) => {
          console.log(accessToken)
          
          const newProduct = {id};
          
          axios.post('http://127.0.0.1:5000/CreateProduct', newProduct, {
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
            <td><button> Add To Cart
            onSubmit={handleSubmit(item.id)} </button></td>
            </tr>
          );
        })}
        </tbody>
      </table>
    
    );
};




export default GetAllFilm;