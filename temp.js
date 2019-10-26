import React, { lazy, Component, Suspense } from "react";
// import { importMDX } from "mdx.macro";
// import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: 0,
      raw: 0
    };
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      fetch("/get").then(res => {
        res.json().then(data => {
          this.setState({ msg: ((data.happy - 32) * 5) / 9, raw: data.happy });
        });
      });
      // this.setState({ msg: Date.now() }
    }, 100);
    // console.log(this.state.msg);
  }

//   function randomIntFromInterval(min, max) { // min and max included 
//     return Math.floor(Math.random() * (max - min + 1) + min);
//   }

  render() {
    return (
      <div>
        <div id="termometer">
          {/* <div
            id="temperature"
            style={{
              height: this.state.raw
            }}
          ></div> */}
          {/* <div id="graduations"></div> */}
          <h1>{this.state.raw}°</h1>
        </div>
      </div>
    );
  }
}
// dataValue="{{this.state.raw}}°C"

export default App;
