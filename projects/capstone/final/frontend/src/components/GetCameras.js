import React, { Component } from 'react';
import axios from 'axios';
import DataTable from './DataTable'


export default class Cameras extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          kind: '',
          data: []
        };
      }

    componentDidMount() {
        axios.get('http://127.0.0.1:5000/CameraPage')
        .then(({ data })=> {
            console.log(data)
            this.setState({ 
            kind: data.kind, 
            data: data.data.children
          });
        })
        .catch((err)=> {})
    }
        
//     render() {
//       const child = this.state.data.map((el, index) => {
//         return <div key={index}>
//           <p>Title - { el.data.cameras }</p>
//         </div>
//       });
  
//       return <div>
//         <p>{ this.state.kind }</p>
//         <div>{ child }</div>
//       </div>;
//     }
//   }


//     renderTableHeader() {
        
//         let header = Object.keys(this.state.cameras[0])
//         return header.map((key, index) => {
//            return <th key={index}>{key.toUpperCase()}</th>
//         })
//      }

    renderTableData() {
        const { id, brand, model, sensor, mount } = 
            this.state.data.map((data, i) => {
            
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{brand}</td>
                    <td>{model}</td>
                    <td>{sensor}</td>
                    <td>{mount}</td>
                </tr>
            )   
        })
    }

//     render() {
//         return (
//            <div>
//               <h1 id='title'>React Dynamic Table</h1>
//               <table id='cameras'>
//                  <tbody>
//                     <tr>{this.renderTableHeader()}</tr>
//                     {this.renderTableData()}
//                  </tbody>
//               </table>
//            </div>
//         )
//      }
//   }