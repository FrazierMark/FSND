import React, { Component } from 'react';
import axios from 'axios';
import '../stylesheets/CreateProductForm.css';

// create-camera-product

export default class CreateCamera extends Component {

    constructor(props) {
        super(props)

        this.onChangeCameraBrand = this.onChangeCameraBrand.bind(this);
        this.onChangeCameraModel = this.onChangeCameraModel.bind(this);
        this.onChangeCameraSensor = this.onChangeCameraSensor.bind(this)
        this.onChangeCameraMount = this.onChangeCameraMount.bind(this)
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            brand: '',
            model: '',
            sensor: '',
            mount: ''
        }
    }

    onChangeCameraBrand(e) {
        this.setState({ brand: e.target.value })
    }

    onChangeCameraModel(e) {
        this.setState({ model: e.target.value })
    }
    onChangeCameraSensor(e) {
        this.setState({ sensor: e.target.value })
    }
    onChangeCameraMount(e) {
        this.setState({ mount: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const cameraObject = {
            brand: this.state.brand,
            model: this.state.model,
            sensor: this.state.sensor,
            mount: this.state.mount
        };

        axios.post('http://127.0.0.1:5000/CreateProduct', cameraObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

        this.setState({ brand: '', model: '', sensor: '', mount: '' })
    }


    render() {
        return (
            <div className="wrapper">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Camera Brand</label>
                        <input type="text" value={this.state.Brand} onChange={this.onChangeCameraBrand} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Add Camera Model</label>
                        <input type="text" value={this.state.Model} onChange={this.onChangeCameraModel} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Add Camera Sensor</label>
                        <input type="text" value={this.state.Sensor} onChange={this.onChangeCameraSensor} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Add Camera Mount</label>
                        <input type="text" value={this.state.Mount} onChange={this.onChangeCameraMount} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Camera" className="btn btn-success btn-block" />
                    </div>
                </form>
            </div>
        )
    }
}