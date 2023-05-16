import React, { Component } from 'react'
import Spinner from './Spinner'
import Navbar from './NavBar'
import Table from './Table'
import { CSVLink } from 'react-csv';
import CanvasJSReact from './canvas/js/canvasjs.react'
import avatar from './assets/avatar.png';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var weeks = [];
var tags = [];
var data = [];
var filename = "Popular_Hashtags.csv"
var dataPoints = [];
var headers = [];
var csvReport = [];
export default class ConnectedCommponents extends Component {
    constructor(props){
        super(props);
        this.getCountUsers = this.getCountUsers.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getPopularHashtags = this.getPopularHashtags.bind(this);
        this.getData = this.getData.bind(this);
        this.getUserHashtags = this.getUserHashtags.bind(this);
        this.state = {
          spinnerActive: false,
          tableActive: false,
          weekValue: null
        }
    }

    async getUserHashtags() {
        try {
            var chart = this.chart
            const username = this.state.weekValue;
            let bg = document.getElementById('background').style;
            let url = 'http://localhost:4000/api/userHashtags'
            bg.filter = 'blur(2px)';
            this.props.setStateData('load', true);
            const result = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username
              })
            }).then((res) => res.json());
      
            bg.filter = '';
            this.props.setStateData('load', false);
            if (result.status === "error") {
                this.setState({ tableActive: false });
              this.props.alertFunc('danger', "Unable to get Data!!!");
            }
            else {
              this.props.alertFunc('success', 'Data Retrieved Successfully!!!');
              dataPoints = [];
              console.log(data);
              console.log(result.data);
              tags = result.data;
              for(var i=0;i<data.length;i++) {
                console.log(data[0]["_id"].username);
                console.log(data[0]["_id"].week);
                console.log(data[0]["count"]);
                console.log(tags[0]["tags"]);
              }
              this.setState({ tableActive: true });
            }
          }
          catch(error) {
            ;
          }
    }

    async getPopularHashtags() {
      try {
    //   var chart = this.chart
      const userId = this.state.weekValue;
      let bg = document.getElementById('background').style;
      let url = 'http://localhost:4000/api/connectedComponents'
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
        this.props.alertFunc('danger', "Unable to get Data!!!");
      }
      else {
        this.props.alertFunc('success', 'Data Retrieved Successfully!!!');
        data = result.data;
        // this.getUserHashtags();
        console.log(data);
        // this.setState({graphActive: true});
        // chart.render();
      }
    }
    catch(error) {
      ;
    }
  }

    async getCountUsers() {
          let bg = document.getElementById('background').style;
          let url = 'http://localhost:4000/api/getAllUserNames'
          bg.filter = 'blur(2px)';
          this.props.setStateData('load', true);
          const result = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => res.json());
    
          if (result.status === "error") {
            this.props.alertFunc('danger', "Unable to get Data!!!");
          }
          else {
            this.props.alertFunc('success', 'Data Retrieved Successfully!!!');
            var min = 0;
            var max = result.data.length;
            for(var i=0;i<20;i++) {
                var k = Math.floor(Math.random() * (max - min) + min);
                weeks.push(result.data[k]);
            }
          }          
          bg.filter = '';
          this.props.setStateData('load', false);
      }

    componentDidMount() {
        // this.getCountUsers();
      }

      handleChange(e) {
        this.setState({ weekValue: e.target.value});
      }

      getData() {
        var a = document.getElementById("first_name");
        this.setState({ weekValue: a.value});
        if(a !== "" || (a <= 10000 && a >= 1 )) {
          this.getPopularHashtags();
      }
      }

  render() {
    return (
        <>
        {this.props.state.load && <Spinner/>}
        <Navbar/>
        <div>
        <form>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Id</label>
            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter a User Id (1-10000)" required/>
        </div>
    </div></form>
<button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" id='button_Search' onClick={this.getData}>Search</button></div>
{/* {this.state.tableActive ?  */}
    {this.state.tableActive && data.map((item, index) => {
    return (
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <img class="w-full" src={avatar} alt="" id='imgId'/>
        <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{this.state.weekValue}</div>
    <p class="text-gray-700 text-base">
      {"Week No: "+item["_id"].week}
    </p>
    <p class="text-gray-700 text-base">
      {"Tweet Count: "+item["count"]}
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    {tags[index]["tags"].map((tag, index) => {
        return (
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{"#"+tag}</span>
        )
    })}
  </div>
</div>
    )})}
{/* // })} : undefined} */}
        </>
    )
  }
}
