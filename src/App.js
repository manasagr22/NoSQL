import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from './Home';
import HashtagAnalysisAllUsers from './HashtagAnalysisAllUsers';
import HashtagAnalysisAllUsersTabular from './HashtagAnalysisAllUsersTabular';
import Start from './Start';
import HashtagAnalysisInfluencial from './HashtagAnalysisInfluencial';
import UADoctor from './UADoctor';
import PostCovid from './PostCovid';
import PopularHashtags from './PopularHashtags';
import TweetFrequency from './TweetFrequency';
import ConnectedCommponents from './ConnectedComponents';

class App extends Component {
  constructor(){
    super();
    this.state = {
      alert: null,
      load: false,
      data: null,
      popCount: null,
      stateShown: false,
    }
    this.handleAlert = this.handleAlert.bind(this);
    this.navigator = this.navigator.bind(this);
    this.setStateData = this.setStateData.bind(this);

    this.data = [null, null];
    this.active = [false, false];
  }
   
  navigator = (position, replace) => {  
      this.props.navigate(position, { replace: replace })
   }

  setStateData(element, data) {
    if(element === 'alert')
    {
      this.setState({
        alert: data,   
      });
    }
    else if(element === 'load')
    {
      this.setState({
        load: data,   
      });
    }
    else if(element === 'data')
    {
      this.setState({
        data: data,   
      });
    }
    else if(element === 'stateShown') {
      this.setState({
        stateShown: data,
      });
    }
    else if(element === 'popCount')
    {
      this.setState({
        popCount: data,   
      }, window.onpopstate = () => {});
    }
  }

   handleAlert = (flag, msg) => {
    if (flag === "success") {
      this.setState({
      alert: {
        msg: msg,
        d: "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z",
        type: flag,
      }
    });

      setTimeout(() => {
        this.setState({
          alert: null
        })
      }, 1800);
    } else {
      this.setState({
      alert: {
        msg: msg,
        d: "M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z",
        type: flag,
      }
    });

      setTimeout(() => {
        this.setState({
          alert: null
        })
      }, 1800);
    }
  };

  render() {
    return (
      <div id='background'>
        
        <Routes>
          <Route exact path="/" element={<Start navigate={this.navigator}/>}></Route>
          <Route exact path="/home" element={<Home navigate={this.navigator}/>}></Route>
          <Route exact path="/0110/hashtag-analysis/allUsers/lineChart" element={<HashtagAnalysisAllUsers navigate={this.navigator} state={this.state} setStateData={this.setStateData} alertFunc={this.handleAlert}/>}></Route>
          <Route exact path="/0110/hashtag-analysis/allUsers/tabular" element={<HashtagAnalysisAllUsersTabular navigate={this.navigator} state={this.state} setStateData={this.setStateData} alertFunc={this.handleAlert}/>}></Route>
          <Route exact path="/0110/hashtag-analysis/InfluencialUsers" element={<HashtagAnalysisInfluencial navigate={this.navigator} state={this.state} setStateData={this.setStateData} alertFunc={this.handleAlert}/>}></Route>
          <Route exact path="/0101/user-analysis/TweetsfromDoctors" element={<UADoctor navigate={this.navigator} state={this.state} setStateData={this.setStateData} alertFunc={this.handleAlert}/>}></Route>
          <Route exact path="/0101/user-analysis/PostCovid" element={<PostCovid navigate={this.navigator} state={this.state} setStateData={this.setStateData} alertFunc={this.handleAlert}/>}></Route>
          <Route exact path="/0111/temporal-analysis/PossibleWeeks" element={<PopularHashtags navigate={this.navigator} state={this.state} setStateData={this.setStateData} alertFunc={this.handleAlert}/>}></Route>
          <Route exact path="/0111/temporal-analysis/TweetFrequency" element={<TweetFrequency navigate={this.navigator} state={this.state} setStateData={this.setStateData} alertFunc={this.handleAlert}/>}></Route>
          <Route exact path="/0111/temporal-analysis/connectedPeople" element={<ConnectedCommponents navigate={this.navigator} state={this.state} setStateData={this.setStateData} alertFunc={this.handleAlert}/>}></Route>
        </Routes>
      </div>
    )
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <App navigate={navigate} />
}

export default WithNavigate
