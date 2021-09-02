import React, { useEffect, useState } from 'react';
import axios from 'axios';


const GetCameras = () => {
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
    return (

      <table className="table-latitude">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Sku</th>
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
            <td><button >Add To Cart </button></td>
            </tr>
          );
        })}
        </tbody>
      </table>
    
    );
};




export default GetCameras;