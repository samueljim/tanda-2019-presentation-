import React, { lazy, Component, Suspense } from "react";
// import { importMDX } from "mdx.macro";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: ""
    };
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      fetch("/api").then(res => {
        res.json().then(data => {
          this.setState({ msg: data.data });
        });
      });
      // this.setState({ msg: Date.now() }
    }, 10000);
    // console.log(this.state.msg);
  }

  render() {
    return (
      <div
        style={{
          width: "100vw",
          height: "60vh",
          backgroundColor: "tomato"
        }}
      >
        Hello {this.state.msg}
      </div>
    );
  }
}

export default App;
