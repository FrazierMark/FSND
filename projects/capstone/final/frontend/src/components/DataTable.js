import React, { Component } from 'react';

class DataTable extends Component {
    render() {
        return (
            <tr>
                {/* <td>
                    {this.props.obj._id}
                </td> */}
                <td>
                    {this.props.obj.brand}
                </td>
                <td>
                    {this.props.obj.model}
                </td>
                <td>
                    {this.props.obj.sensor}
                </td>
                <td>
                    {this.props.obj.mount}
                </td>
            </tr>
        );
    }
}

export default DataTable;