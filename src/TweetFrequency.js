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
export default class TweetFrequency extends Component {
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
      const username = this.state.weekValue;
      let bg = document.getElementById('background').style;
      let url = 'http://localhost:4000/api/tweetFrequency'
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
        this.props.alertFunc('danger', "Unable to get Data!!!");
      }
      else {
        this.props.alertFunc('success', 'Data Retrieved Successfully!!!');
        data = result.data;
        this.getUserHashtags();
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
        this.getCountUsers();
      }

      handleChange(e) {
        this.setState({ weekValue: e.target.value});
      }

      getData() {
        if(this.state.weekValue !== "" || this.state.weekValue !== "Choose a Week Number") {
          this.getPopularHashtags();
      }
      }

  render() {
    return (
        <>
        {this.props.state.load && <Spinner/>}
        <Navbar/>
        <div style={{display: 'flex'}}>
          <label for="underline_select" class="sr-only">Underline select</label>
<select id="underline_select" style={{marginLeft: '30px'}} class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" onChange={this.handleChange}>
    <option selected id='selected'>Select a User</option>
    {weeks.map((week) => {
        return (
            <option value={week}>{week}</option>
        )
    })}
</select>
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
