import React, { Component } from 'react'
import Spinner from './Spinner'
import Navbar from './NavBar'
import Table from './Table'
import { CSVLink } from 'react-csv';
import CanvasJSReact from './canvas/js/canvasjs.react'

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var weeks = [];
var column_info = [];
var data = "";
var filename = "Popular_Hashtags.csv"
var dataPoints = [];
var headers = [];
var csvReport = [];
export default class PopularHashtags extends Component {
    constructor(props){
        super(props);
        this.getCountUsers = this.getCountUsers.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getPopularHashtags = this.getPopularHashtags.bind(this);
        this.getData = this.getData.bind(this);
        this.state = {
          spinnerActive: false,
          tableActive: false,
          weekValue: null
        }
    }

    async getPopularHashtags() {
      try {
      var chart = this.chart
      const weekNo = this.state.weekValue;
      let bg = document.getElementById('background').style;
      let url = 'http://localhost:4000/api/popularHashtags'
      bg.filter = 'blur(2px)';
      this.props.setStateData('load', true);
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          weekNo
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
        dataPoints = [];
        for (var j = 0; j < result.data.length; j++) {
          dataPoints.push({
            label: data[j]["hash"],
            y: data[j]["count"]
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
          let url = 'http://localhost:4000/api/possibleWeeks'
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
                weeks.push(result.data[i]['_id'])
            }
            this.setState({ tableActive: true });
          }
      }

    componentDidMount() {
        column_info = ["Hashtag", "Number of Users"]
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
    const options = {
      animationEnabled: true,
            exportEnabled: true,
            theme: "light2", // "light1", "dark1", "dark2"
            title:{
                text: `Week No.: `+this.state.weekValue
            },
            axisY: {
              title: "Number of Users",
            },
            axisX: {
              title: "Hashtag"
            },
            data: [{
                type: "line",
                // toolTipContent: "Week {x}: {y}%",
                dataPoints: dataPoints
      }]
      }
    return (
      
        <>
        {this.props.state.load && <Spinner/>}
        <Navbar/>
        <div style={{display: 'flex'}}>
          <label for="underline_select" class="sr-only">Underline select</label>
<select id="underline_select" style={{marginLeft: '30px'}} class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" onChange={this.handleChange}>
    <option selected id='selected'>Choose a Week Number</option>
    {weeks.map((week) => {
        return (
            <option value={week}>{week}</option>
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
