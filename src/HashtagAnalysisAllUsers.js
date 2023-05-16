import React, { Component } from 'react'
import NavBar from './NavBar'
import Spinner from './Spinner';
import CanvasJSReact from './canvas/js/canvasjs.react'

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dataPoints = [];
var data = "";
// var selectedOption = "option1";

export default class HashtagAnalysisAllUsers extends Component {
  constructor(props){
    super(props);
    this.getCountUsers = this.getCountUsers.bind(this);
    this.state = {
      spinnerActive: false
    }
}

  async getCountUsers() {
    var chart = this.chart;
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
        console.log("error");
        this.props.alertFunc('danger', "Unable to get Data!!!");
      }
      else {
        this.props.alertFunc('success', 'Data Retrieved Successfully!!!');
        data = result.data;
        console.log(data);
        dataPoints = [];
        for (var j = 0; j < 10; j++) {
          dataPoints.push({
            label: data[j]["_id"],
            y: data[j]["count"]
          });
        }
        chart.render();
      }
  }

  componentDidMount() {
    this.getCountUsers();
  }

  componentWillUnmount() {
    // this.chart.clear();
  }

  render() {
    const options = {
      animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "All Users"
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
      // <div id='Hashtag'>
      <>
        <NavBar/>
      {this.props.state.load && <Spinner/>}
       {/* <div> */}
  <div>
			<CanvasJSChart options = {options} 
				 onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
		{/* </div> */}
      </>
    )
  }
}
{/* <Table data_keys={Object.keys(data)}/> */}
