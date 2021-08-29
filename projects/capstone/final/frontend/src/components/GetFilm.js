import React, { useEffect, useState } from 'react';
import axios from 'axios';


const GetAllFilm = () => {

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
            <td><button >Add To Cart </button></td>
            </tr>
          );
        })}
        </tbody>
      </table>
    
    );
};




export default GetAllFilm;