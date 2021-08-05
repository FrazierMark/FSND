import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


// const td = withStyles((theme) => ({
//     head: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     body: {
//       fontSize: 14,
//     },
//   }))(TableCell);
  
//   const StyledTableRow = withStyles((theme) => ({
//     root: {
//       '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.action.hover,
//       },
//     },
//   }))(TableRow);

//   const useStyles = makeStyles({
//     table: {
//       minWidth: 700,
//     },
//   });
  
  

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
    <div className="Cameras">
      <table>
        <thead>
          <tr>
            <th>Camera</th>
            <th align="right">Brand</th>
            <th align="right">Model</th>
            <th align="right">Sensor</th>
            <th align="right">Mount</th>
          </tr>
        </thead>
        <tbody>

        {camera.map((item) => {
            return (
            <tr> {item.index}
            
                <th> {item.brand} </th>
                <td align="right">{item.model}</td>
                <td align="right">{item.sensor}</td>
                <td align="right">{item.sensor}</td>
                <td align="right">{item.mount}</td>
            
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
    );
};


export default GetCameras;