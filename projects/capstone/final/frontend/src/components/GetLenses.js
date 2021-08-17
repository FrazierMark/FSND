import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react'


const GetLenses = () => {
    const [lens, setLens] = useState([]);

    const getLensData = async () => {
        try {
            const data = await axios.get('http://127.0.0.1:5000/LensPage');
        console.log(data.data.lenses);
        setLens(data.data.lenses);
    } catch (e){
        console.log(e);
    }
};
    
    useEffect(() => {
        getLensData();
    }, []);
    return (

      <table class="table-latitude">
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

        {lens.map((item) => {
            return (
            <tr> {item.index}
            
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




export default GetLenses;