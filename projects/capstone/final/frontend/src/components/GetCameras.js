import React, { useEffect, useState } from 'react';
import axios from 'axios';


const GetCameras = () => {
    const [camera, setCamera] = useState([]);

    const getCameraData = async () => {
        try {
            const data = await axios.get('http://127.0.0.1:5000/CameraPage');
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

      <table class="table-latitude">
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

        {camera.map((item) => {
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




export default GetCameras;