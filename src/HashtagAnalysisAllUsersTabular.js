import React, { Component } from 'react'
import Spinner from './Spinner'
import Navbar from './NavBar'
import Table from './Table';

var data = "";
var column_info = []
var filename = "AllUsers.csv"

export default class HashtagAnalysisAllUsersTabular extends Component {
    constructor(props){
        super(props);
        this.getCountUsers = this.getCountUsers.bind(this);
        this.state = {
          spinnerActive: false,
          tableActive: false
        }
    }

    async getCountUsers() {
          let bg = document.getElementById('background').style;
          let url = 'http://localhost:4000/api/getCountUsers'
          bg.filter = 'blur(2px)';
          this.props.setStateData('load', true);
          const result = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => res.json());
    
          bg.filter = '';
          this.props.setStateData('load', false);
          if (result.status === "error") {
            this.props.alertFunc('danger', "Unable to get Data!!!");
          }
          else {
            this.props.alertFunc('success', 'Data Retrieved Successfully!!!');
            data = result.data;
            this.setState({ tableActive: true });
          }
      }
    
      componentDidMount() {
        column_info = ["Hashtag", "Number of Users"]
        this.getCountUsers();
      }

  render() {
    return (
        <>
        {this.props.state.load && <Spinner/>}
        <Navbar/>
    
    {this.state.tableActive ? <Table data={data} column_info={column_info} filename={filename}/> : undefined}
        </>
      )
  }
}
