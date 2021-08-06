import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'

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
            <th>Brand</th>
            <th>Model</th>
            <th>Sensor</th>
            <th>Mount</th>
          </tr>
        </thead>
        <tbody>

        {camera.map((item) => {
            return (
            <tr> {item.index}
            
            <td> {item.brand} </td>
            <td >{item.model}</td>
            <td >{item.sensor}</td>
            <td >{item.mount}</td>
            
            </tr>
          );
        })}
        </tbody>
      </table>
    );
};




export default GetCameras;