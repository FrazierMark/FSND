import React, { Component } from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import CreateProduct from './CreateProduct';

// create-camera-product
const domain = "m-mark-frazier.us.auth0.com";

class CreateProductForm extends Component {

    constructor(props) {
        super(props)

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductDescription = this.onChangeProductDescription.bind(this);
        this.onChangeProductSku = this.onChangeProductSku.bind(this);
        this.onChangeProductCategory = this.onChangeProductCategory.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            brand: '',
            model: '',
            sensor: '',
            mount: '',
            price: '',
        }
    }
    

    onChangeProductName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeProductDescription(e) {
        this.setState({ description: e.target.value })
    }
    onChangeProductSku(e) {
        this.setState({ sku: e.target.value })
    }
    onChangeProductCategory(e) {
        this.setState({ category: e.target.value })
    }
    onChangeProductPrice(e) {
        this.setState({ price: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const { getAccessTokenSilently } = this.props.auth0;
        const accessToken = getAccessTokenSilently() 
    
        console.log(accessToken)

        const productObject = {
            name: this.state.name,
            description: this.state.description,
            sku: this.state.sku,
            category: this.state.category,
            price: this.state.price
        };
        console.log(productObject)

        axios.post('http://127.0.0.1:5000/CreateProduct', productObject,
            {headers: {'Authorization': `bearer ${accessToken}`}
        })
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

        this.setState({ name: '', description: '', sku: '', category: '', price: 0.00 })
    }


    render() {
        return (
            <div className="wrapper">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Product Name</label>
                        <input type="text" value={this.state.Name} onChange={this.onChangeProductName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Add Product Description</label>
                        <input type="text" value={this.state.Description} onChange={this.onChangeProductDescription} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Add Product Sku</label>
                        <input type="text" value={this.state.Sku} onChange={this.onChangeProductSku} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Add Product Category</label>
                        <input type="text" value={this.state.Category} onChange={this.onChangeProductCategory} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Add Product Price</label>
                        <input type="float" value={this.state.Price} onChange={this.onChangeProductPrice} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Product" className="btn btn-success btn-block" />
                    </div>
                </form>
            </div>
        )
    }
}

export default withAuth0(CreateProductForm)