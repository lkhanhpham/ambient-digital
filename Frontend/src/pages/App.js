import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Library from "./Library";

class App extends Component {
  render(){
    return (
      <>
      <Header />
      <Library />
    </>
    );
  }
}

export default App;
