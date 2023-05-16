import React, { Component } from 'react'
import Spinner from './Spinner';
import Navbar from './NavBar';
import Table from './Table';
import CanvasJSReact from './canvas/js/canvasjs.react'
import { CSVLink } from "react-csv";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var data = "";
var headers = []
var column_info = []
var hashtag_list = []
var csvReport = []
var filename = "InfluencialUsers.csv"
var dataPoints = []
export default class HashtagAnalysisInfluencial extends Component {
    constructor(props){
        super(props);
        this.getCountUsers = this.getCountUsers.bind(this);
        this.getData = this.getData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          spinnerActive: false,
          hashtagValue: "",
          graphActive: false
        }
    }

    async getData() {
        if(this.state.hashtagValue !== "" || this.state.hashtagValue !== "Choose a Hashtag") {
            this.getInfluencialUsers();
        }
    }

    async getInfluencialUsers() {
        try {
        var chart = this.chart;
        const hashtag = this.state.hashtagValue;
        let bg = document.getElementById('background').style;
        let url = 'http://localhost:4000/api/getInfluencialUsers'
        bg.filter = 'blur(2px)';
        this.props.setStateData('load', true);
        const result = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hashtag
          }),
        }).then((res) => res.json());
  
        bg.filter = '';
        this.props.setStateData('load', false);
        if (result.status === "error") {
          this.props.alertFunc('danger', "Unable to get Data!!!");
        }
        else {
          this.props.alertFunc('success', 'Data Retrieved Successfully!!!');
          data = result.data;

          dataPoints = [];
        for (var j = 0; j < 10; j++) {
          dataPoints.push({
            label: data[j]["_id"],
            y: data[j]["user_followers"]
          });
        }
        for(j=0;j<data.length;j++) {
            headers = [];
            for(var k=0;k<column_info.length;k++) {
                headers.push(data[j][Object.keys(data[0])[k]])
            }
            csvReport.push(headers);
        }
        this.setState({graphActive: true});
        chart.render();
        }
    }
    catch(error) {
        ;
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

            for(var i=0;i<20;i++) {
                hashtag_list.push(data[i]["_id"]);
            }
            this.setState({ tableActive: true });
          }
      }
    
      componentDidMount() {
        column_info = ["User Name", "Number of Followers"]
        for(var i=0;i<column_info.length;i++) {
            headers.push(column_info[i])
        }
        csvReport.push(headers);

        this.getCountUsers();
      }

      handleChange(e) {
        this.setState({ hashtagValue: e.target.value});
      }

  render() {
    const options = {
        animationEnabled: true,
              exportEnabled: true,
              theme: "light2", // "light1", "dark1", "dark2"
              title:{
                  text: this.state.hashtagValue
              },
              axisY: {
              	title: "Number of Followers",
              },
              axisX: {
                title: "User Name"
              },
              data: [{
                  type: "line",
                  // toolTipContent: "Week {x}: {y}%",
                  dataPoints: dataPoints
        }]
        }
    return (
      <>
      <Navbar/>
        {this.props.state.load && <Spinner/>}
          <div style={{display: 'flex'}}>
          <label for="underline_select" class="sr-only">Underline select</label>
<select id="underline_select" style={{marginLeft: '30px'}} class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" onChange={this.handleChange}>
    <option selected id='selected'>Choose a Hashtag</option>
    {hashtag_list.map((hashtag) => {
        return (
            <option value={hashtag}>{hashtag}</option>
        )
    })}
</select>
<button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" id='button_Search' onClick={this.getData}>Search</button></div>
{this.state.graphActive ? <CSVLink data={csvReport} download={filename}><span class="material-symbols-outlined" id='download_button'>download</span></CSVLink> : undefined}
    {this.state.graphActive ? <div>
			<CanvasJSChart options = {options} 
				 onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div> : undefined}
        </>
    )
  }
}
