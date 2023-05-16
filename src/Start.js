import React, { Component } from 'react'
import "./App.css"
import preloader from "./assets/preloader.gif";

export default class Start extends Component {
    constructor(props) {
        super(props);
        this.preload = this.preload.bind(this);
    }
    preload = () => {
        let a = document.getElementById('preload');
        a.style.display = 'none';
        this.props.navigate("/home", true);
      }

  render() {
    return (
        <div class="preloader" id='preload'>
        <button onClick={this.preload} style={{background: 'none', border: 0}} id='buttonId'>
          <img src={preloader} alt="" id='imgId'></img>
        </button>
      </div>
    )
  }
}
