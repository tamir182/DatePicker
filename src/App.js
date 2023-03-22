import React, { Component } from "react";
import "./App.css";
import DateRangePicker from "./Components/DateRangePicker/DateRangePicker";
class App extends Component {
  render() {
    return (
      <div className="App">
        <DateRangePicker />
      </div>
    );
  }
}

export default App;
