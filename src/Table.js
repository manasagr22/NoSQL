import React, { Component } from 'react'
import { CSVLink } from "react-csv";

var headers = []
var csvReport = []
var keys = []
var data_updated = []
export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableActive: false
        }
    }

    componentDidMount() {
        try {
        var a = document.getElementById("tables");
        a.remove();
        }
        catch(error) {
            ;
        }
        this.setState({ tableActive: true })
        keys = Object.keys(this.props.data[0]);
        headers = []
        csvReport = []
        data_updated = []
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
      <>{this.state.tableActive && <div className="tableClass" id='tableCls'>
        <CSVLink data={csvReport} download={this.props.filename}><span class="material-symbols-outlined" id='download_button'>download</span></CSVLink>
        <table class="shadow-lg bg-white border-separate" id='tables'>
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
      </div>}</>
    )
  }
}
