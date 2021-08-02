import React, { Component } from 'react';
import axios from 'axios';
import DataTable from './DataTable'
import { CompressedPixelFormat } from 'three';

export default class Cameras extends Component {

    constructor(props) {
        super(props);
        this.state = { camerasCollection: [] };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:5000/CameraPage')
        .then(res => {
            this.setState({ usersCollection: res.data });
            })
            
            .catch(function (error) {
                console.log(error);
            })
    }


    dataTable() {
        return this.state.camerasCollection.map((data, i) => {
            return <DataTable obj={data} key={i} />;
        });
    }

    render() {
        return (
            <div className="wrapper-users">
                <div className="container">
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <td>ID</td>
                                <td>Brand</td>
                                <td>Model</td>
                                <td>Sensor</td>
                                <td>Mount</td>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {this.dataTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}