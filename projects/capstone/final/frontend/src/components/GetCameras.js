import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from './DataTable'


const getCameras = () => {
const [camera, setCamera] = useState([])

    const getCameraData = async () => {
        try {
            const data = await axios.get('http://127.0.0.1:5000/CameraPage');
        console.log(data.data.cameras);
        setCamera(data.data.cameras)
    } catch (e){
        console.log(e)
    }
};
    
    useEffect(() => {
        getCameraData();
    }, []);
    return (
    <div className="Cameras">
        <h1> TEST </h1>
        {camera.map((item) => {
            return <p>{item.name}</p>
        })}
    </div>
    );
};


export default getCameras;