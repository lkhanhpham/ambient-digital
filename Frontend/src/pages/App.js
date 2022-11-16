import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Library from "./Library";
//the Library, which contains all quizes from one author, and the header are put together
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
