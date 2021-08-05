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


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
  
  

const GetCameras = () => {
    const classes = useStyles();
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
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Camera</StyledTableCell>
            <StyledTableCell align="right">Brand</StyledTableCell>
            <StyledTableCell align="right">Model</StyledTableCell>
            <StyledTableCell align="right">Sensor</StyledTableCell>
            <StyledTableCell align="right">Mount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {camera.map((item) => {
            return (
            <StyledTableRow key={item.index}>
              <StyledTableCell component="th" scope="row">
                {item.brand}
              </StyledTableCell>
              <StyledTableCell align="right">{item.model}</StyledTableCell>
              <StyledTableCell align="right">{item.sensor}</StyledTableCell>
              <StyledTableCell align="right">{item.sensor}</StyledTableCell>
              <StyledTableCell align="right">{item.mount}</StyledTableCell>
            </StyledTableRow>
          );
        })}
            
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    );
};


export default GetCameras;