import React, { Component } from 'react'
import { CSVLink } from "react-csv";

var headers = []
var csvReport = []
var keys = []
var data_updated = []
export default class Table extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        keys = Object.keys(this.props.data[0]);
        for(var i=0;i<this.props.column_info.length;i++) {
            headers.push(this.props.column_info[i])
        }
        csvReport.push(headers);

        for(var j=0;j<this.props.data.length;j++) {
            headers = [];
            for(var k=0;k<this.props.column_info.length;k++) {
                headers.push(this.props.data[j][Object.keys(this.props.data[0])[k]])
            }
            csvReport.push(headers);
        }

        for(i=0;i<20;i++) {
            data_updated.push(this.props.data[i])
        }
    }

  render() {
    return (
      <div className="tableClass" id='tableCls'>
        <CSVLink data={csvReport} download={this.props.filename}><span class="material-symbols-outlined" id='download_button'>download</span></CSVLink>
        <table class="shadow-lg bg-white border-separate">
        <tr>
            {this.props.column_info.map((column) => {
                return (
                    <th id={column.id} class="bg-blue-100 border text-left px-8 py-4">{column}</th>
                )
            })}
            </tr>
                {data_updated.map((item, index) => {
                    return (
                        <tr>
                            {keys.map((key) => {
                                return (
                                    <td class="border px-8 py-4" id={index}>{item[key]}</td>
                                )
                            })}
                        </tr>
                    )
                })}
            </table>
      </div>
    )
  }
}
