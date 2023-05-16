import React, { Component } from 'react'
import Spinner from './Spinner'
import Navbar from './NavBar'
import Table from './Table'
import { CSVLink } from 'react-csv';
import CanvasJSReact from './canvas/js/canvasjs.react'
import avatar from './assets/avatar.png';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var data = [];
var filename = "TotalLikes.csv"
var column_info = [];
export default class TotalLikes extends Component {
    constructor(props){
        super(props);
        // this.getCountUsers = this.getCountUsers.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getPopularHashtags = this.getPopularHashtags.bind(this);
        this.getData = this.getData.bind(this);
        // this.getUserHashtags = this.getUserHashtags.bind(this);
        this.state = {
          spinnerActive: false,
          tableActive: false,
          weekValue: null
        }
    }

    async getPopularHashtags(a) {
      try {
    //   var chart = this.chart
    this.setState({tableActive: false});
      const userId = a;
      console.log(userId)
      let bg = document.getElementById('background').style;
      let url = 'http://localhost:4000/api/totalLikes'
      bg.filter = 'blur(2px)';
      this.props.setStateData('load', true);
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId
        })
      }).then((res) => res.json());

      bg.filter = '';
      this.props.setStateData('load', false);
      if (result.status === "error") {
        this.setState({tableActive: false});
        this.props.alertFunc('danger', "Unable to get Data!!!");
      }
      else {
        this.props.alertFunc('success', 'Data Retrieved Successfully!!!');
        data = result.data
        this.setState({tableActive: true});
      }
    }
    catch(error) {
      ;
    }
  }

    componentDidMount() {
        column_info = ["User Id", "User Name"]
        // this.getCountUsers();
      }

      handleChange(e) {
        this.setState({ weekValue: e.target.value});
      }

      getData() {
        const a = parseInt(document.getElementById("first_name").value);
        this.setState({ weekValue: a});
        if(a !== 0 || (a <= 10000 && a >= 1 )) {
          this.getPopularHashtags(a);
      }
      }

  render() {
    return (
        <>
        {this.props.state.load && <Spinner/>}
        <Navbar/>
        <div>
        <form>
    <div class="grid gap-6 mb-6 md:grid-cols-2" style={{margin: "auto", display: "block"}}>
        <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Id</label>
            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter a User Id (1-10000)" required/>
        </div>
    </div></form>
<button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" id='button_Search' onClick={this.getData} style={{margin: "auto", display: "block"}}>Search</button></div>
{this.state.tableActive && data.map((item, index) => {
    return (
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <img class="w-full" src={avatar} alt="" id='imgId'/>
        <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{"User Id: "+this.state.weekValue}</div>
    <p class="text-gray-700 text-base">
      {"Total Likes: "+item["totalLikes"]}
    </p>
  </div>
</div>
    )})}
        </>
    )
  }
}
