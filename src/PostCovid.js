import React, { Component } from 'react'
import Spinner from './Spinner'
import Navbar from './NavBar'
import Table from './Table'

var data = [];
var column_info = [];
var filename = "Post_Covid_Joining.csv"
export default class PostCovid extends Component {
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
          let url = 'http://localhost:4000/api/usersAfterCovid'
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
            for(var i=0;i<result.data.length;i++) {
                data.push({
                    user_name: result.data[i]['_id'],
                    user_created: result.data[i]['user_created']
                })
            }
            this.setState({ tableActive: true });
          }
      }

    componentDidMount() {
        column_info = ["User Name", "Date of Joining"]
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
