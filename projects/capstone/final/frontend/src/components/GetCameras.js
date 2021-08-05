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
      <Table striped bordered hover variant="dark" size="sm">
        <thead>
          <tr class width="570">
            <th width="570" align="right">Brand</th>
            <th width="170" align="right">Model</th>
            <th width="170" align="right">Sensor</th>
            <th width="170" align="right">Mount</th>
          </tr>
        </thead>
        <tbody>

        {camera.map((item) => {
            return (
            <tr> {item.index}
            
            <td> {item.brand} </td>
            <td align="right">{item.model}</td>
            <td align="right">{item.sensor}</td>
            <td align="right">{item.mount}</td>
            
            </tr>
          );
        })}
        </tbody>
      </Table>
    );
};


export default GetCameras;